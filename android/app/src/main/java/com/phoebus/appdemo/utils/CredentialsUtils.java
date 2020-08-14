package com.phoebus.appdemo.utils;
import br.com.phoebus.android.payments.api.ApplicationInfo;
import br.com.phoebus.android.payments.api.Credentials;

public class CredentialsUtils {

  public static final String TEST_APPLICATION_ID = "0";
  public static final String TEST_SECRET_TOKEN = "000000000000000000000000";

  public static Credentials getMyCredentials() {
    Credentials credentials = new Credentials();
    credentials.setApplicationId(TEST_APPLICATION_ID);
    credentials.setSecretToken(TEST_SECRET_TOKEN);
    return credentials;
  }

  public static ApplicationInfo getMyAppInfo() {

    ApplicationInfo applicationInfo = new ApplicationInfo();
    applicationInfo.setCredentials(getMyCredentials());
    applicationInfo.setSoftwareVersion("1.0");

    return applicationInfo;
  }
}
