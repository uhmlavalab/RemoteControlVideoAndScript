
int ledPin = 11;
int l1000 = 10;
int l0100 = 11;
int l0010 = 12;
int l0001 = 13;

void setup() {
  // begin "activation" of serial with bit rate of 9600 bps
  //bps = bits per second = baud
  Serial.begin(9600); 
  pinMode( l1000, OUTPUT);
  pinMode( l0100, OUTPUT);
  pinMode( l0010, OUTPUT);
  pinMode( l0001, OUTPUT);
}

void loop() {

  if (Serial.available() > 0) {
    char value = Serial.read(); //only 1 char?
    switch( value ) {
      case 'a':
        digitalWrite( l1000, HIGH);
        Serial.println( "1--- turned on" );
        break;
      case 's':
        digitalWrite( l0100, HIGH);
        Serial.println( "-1-- turned on" );
        break;
      case 'd':
        digitalWrite( l0010, HIGH);
        Serial.println( "--1- turned on" );
        break;
      case 'f':
        digitalWrite( l0001, HIGH);
        Serial.println( "1--- turned on" );
        break;
      case 'q':
        digitalWrite( l1000, LOW);
        Serial.println( "-1-- turned off" );
        break;
      case 'w':
        digitalWrite( l0100, LOW);
        Serial.println( "--1- turned off" );
        break;
      case 'e':
        digitalWrite( l0010, LOW);
        Serial.println( "---1 turned off" );
        break;
      case 'r':
        digitalWrite( l0001, LOW);
        Serial.println( "---1 turned off" );
        break;
      default:
        Serial.println("Discarding " + value);
        break;  
    }
  } //end if serial available
  delay(500); //check serial only 1/sec
  
}
