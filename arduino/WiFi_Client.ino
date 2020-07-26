/**
 * NTPClient by Fabrice Wenberg
 * Time by Michael Margolis
 */
#include <WiFi.h>
#include <WiFiUdp.h>
#include <HTTPClient.h>
#include <NTPClient.h>
#include <TimeLib.h>

const char* ssid     = "StopJayDN";
const char* password = "happy20100404";

const char* host = "192.168.1.13";

unsigned long lastTime = 0;
unsigned long timerDelay = 2000;

WiFiUDP ntpUDP;

NTPClient timeClient(ntpUDP);

const unsigned int PIN_FSR = 34;
const unsigned int PIN_DEFAULT_LED = 2;

const unsigned int SITDOWN_LIMIT = 1000;

bool statusSitdown = false;

void setup()
{
    Serial.begin(115200);
    delay(10);

    // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    timeClient.begin();

    pinMode(PIN_FSR, INPUT);
    pinMode(PIN_DEFAULT_LED, OUTPUT);
}

int value = 0;

void loop()
{
  timeClient.update();
//  Serial.println(analogRead(PIN_FSR));

  if( (millis() - lastTime) > timerDelay ){
    if( WiFi.status() == WL_CONNECTED){
      digitalWrite(PIN_DEFAULT_LED, HIGH);
      bool curSitdownState = analogRead(PIN_FSR) > SITDOWN_LIMIT;
      
      if( statusSitdown != curSitdownState ){
        Serial.println("StatusChanged");
        statusSitdown = curSitdownState;
        String statusString = statusSitdown ? "Sitdown" : "Standup";

        HTTPClient http;
        String url = "/flows";
        const int httpPort = 3000;
        http.begin(host, httpPort, url);
  
        http.addHeader("Content-Type", "application/json");
  
        time_t t = timeClient.getEpochTime();
        setTime(t);
        adjustTime(3600 * 9);
        String curDate = String(year())+"."+String(month())+"."+String(day());
        String curTime = String(hour())+":"+String(minute())+":"+String(second());
  
        if( year() != 1970 ){
          int httpRespCode = http.POST("{\"time\":\"" + curDate + "/" + curTime + "\",\"event\":\"" + statusString + "\"}");
          Serial.print("HTTP Response code:");
          Serial.println(httpRespCode);        
        }     


    /*  GET */
    //      int httpRespCode = http.GET();
    //
    //      if( httpRespCode > 0){
    //        Serial.print("HTTP Response code:");
    //        Serial.println(httpRespCode);
    //        String payload = http.getString();
    //        Serial.println(payload);
    //      } else {
    //        Serial.print("Error code: ");
    //        Serial.println(httpRespCode);
    //      }
    
          http.end();
      }
    } else {
      Serial.println("Wifi Disconnected");
      digitalWrite(PIN_DEFAULT_LED, LOW);
    }           
    
    lastTime = millis();
  }
}
