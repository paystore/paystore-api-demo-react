import subprocess
import re
import argparse
import os
from pathlib import Path

def obter_tags_ordenadas(caminho_repositorio):
    """Obtém uma lista de tags do repositório, ordenadas da mais recente para a mais antiga."""
    try:
        comando = ["git", "-C", caminho_repositorio, "for-each-ref", "--sort=-creatordate", "--format='%(refname:short)'", "refs/tags"]
        resultado = subprocess.check_output(comando, universal_newlines=True, encoding='utf-8').strip().split("\n")
        return [tag.strip("'") for tag in resultado]
    except subprocess.CalledProcessError as e:
        print("Erro ao obter tags ordenadas:", e)
        return []

def obter_mensagens_entre_tags(caminho_repositorio, tag_atual, tag_anterior):
    """Obtém as mensagens de commits entre duas tags específicas."""
    try:
        comando = ["git", "-C", caminho_repositorio, "log", f"{tag_anterior}..{tag_atual}", "--pretty=format:%s"]
        resultado = subprocess.check_output(comando, universal_newlines=True, encoding='utf-8')
        mensagens = resultado.splitlines()

        agrupadas = {}
        for mensagem in mensagens:
            mensagem_limpa = re.sub(r"(refs #\d+\s*-?\s*)", "", mensagem).strip()
            match = re.search(r"refs #(\d+)", mensagem)
            if match:
                ref = match.group(1)
                if ref not in agrupadas:
                    agrupadas[ref] = []
                agrupadas[ref].append(mensagem_limpa)
            else:
                if "sem_referencia" not in agrupadas:
                    agrupadas["sem_referencia"] = []
                agrupadas["sem_referencia"].append(mensagem_limpa)
        
        return agrupadas
    except subprocess.CalledProcessError as e:
        print(f"Erro ao obter mensagens entre {tag_anterior} e {tag_atual}:", e)
        return {}

def gerar_release_notes_entre_tags(caminho_repositorio, caminho_arquivo, tag_especifica=None):
    """Gera o arquivo releaseNotes.md com mensagens de commit entre tags consecutivas."""
    try:
        tags = obter_tags_ordenadas(caminho_repositorio)
        if len(tags) < 2:
            print("Número insuficiente de tags para calcular a diferença.")
            return

        with open(caminho_arquivo, "w", encoding='utf-8') as arquivo:
            arquivo.write("# Release Notes\n\n")
            
            # Caso uma tag específica seja fornecida, gerar release notes apenas para essa tag e a anterior
            if tag_especifica:
                try:
                    idx_tag = tags.index(tag_especifica)
                except ValueError:
                    print(f"A tag '{tag_especifica}' não foi encontrada no repositório.")
                    return
                
                if idx_tag + 1 >= len(tags):
                    print(f"A tag '{tag_especifica}' é a tag mais antiga e não tem uma tag anterior.")
                    return

                tag_anterior = tags[idx_tag + 1]
                arquivo.write(f"## {tag_especifica}\n\n")
                commits_por_referencia = obter_mensagens_entre_tags(caminho_repositorio, tag_especifica, tag_anterior)
                
                for ref, mensagens in commits_por_referencia.items():
                    arquivo.write(f"#### refs: {ref}\n")
                    for mensagem in mensagens:
                        arquivo.write(f"- {mensagem}\n")
                    arquivo.write("\n")
            else:
                # Itera sobre pares de tags consecutivas
                for i in range(len(tags) - 1):
                    tag_atual = tags[i]
                    tag_anterior = tags[i + 1]
                    
                    arquivo.write(f"## {tag_atual}\n\n")
                    commits_por_referencia = obter_mensagens_entre_tags(caminho_repositorio, tag_atual, tag_anterior)
                    
                    for ref, mensagens in commits_por_referencia.items():
                        arquivo.write(f"#### refs: {ref}\n")
                        for mensagem in mensagens:
                            arquivo.write(f"- {mensagem}\n")
                        arquivo.write("\n")

        print(f"Arquivo {caminho_arquivo} gerado com sucesso.")
    except Exception as e:
        print("Erro ao gerar arquivo de release notes entre tags:", e)

def main():
    parser = argparse.ArgumentParser(description="Gera release notes entre tags consecutivas ou para uma tag específica.")
    parser.add_argument("caminho_repositorio", help="Caminho para o repositório Git. Use './' para o diretório atual.")
    parser.add_argument("-f", "--file", help="Caminho e nome do arquivo de saída. Default: releaseNotes.md no caminho do repositório.")
    parser.add_argument("-r", "--referencia", help="Tag específica para comparar com a tag anterior.")
    args = parser.parse_args()

    caminho_repositorio = Path(args.caminho_repositorio).resolve()
    if not caminho_repositorio.is_dir():
        print(f"O caminho '{caminho_repositorio}' não é um diretório válido.")
        return

    caminho_arquivo = args.file if args.file else caminho_repositorio / "releaseNotes.md"
    
    gerar_release_notes_entre_tags(caminho_repositorio, caminho_arquivo, args.referencia)

if __name__ == "__main__":
    main()

