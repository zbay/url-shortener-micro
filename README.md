**Timestamp Microservice**


Uses:
* You can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp,
a natural language date (example: January 1, 2016), or a date in YYYY-MM-DD format (like 2016-01-18).
* If it does, it returns both the Unix timestamp and the natural language form of that date.
* If it does not contain a date or Unix timestamp, it returns null for those properties.

Sample Input:

https://timestamper-micro.herokuapp.com/December%2015,%202015

https://timestamper-micro.herokuapp.com/1450137600

https://timestamper-micro.herokuapp.com/2015-12-15

Sample Output:

{ "unix": 1450137600, "natural": "December 15, 2015" }