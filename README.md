
# Project Title: Sms && Push-Notification

## Author: Adeola Victor Banjo

The implementation explains the logic for sending sms or push notification to users based on the provider chosen. 

The approach uses the restful api to send messages to the users whose Ids are specified in the request body. The request body is shown below;
 The request body below is sent when SMS is being sent
 ```
{
    "message": "Hello there!",
    "userIds": ["abc1d", "cbrc3d", "cefc3e"],
    "allUsers": true,
    "userType": "admin",
    "type": "SMS"
}
```
if SMS messages are successfully sent, a success messsage is returned as shown below;
```
{
    "status": true,
    "data": "Message successfully sent."
}
```
For push notification, the request body is shown below;

```
{
    "fcmToken": "hj3ukhjdhiku3iknju",
    "userIds": ["abc1d", "cbrc3d", "cefc3e"],
    "allUsers": true,
    "sender": "swvl",
    "data": {
        "type": "PUSH_NOTIFICATION",
        "payload": {
            "title": "Push notificatio to users",
            "message": "All users should receive notification",
            "imageUrls": "imageUrl, smapleImage, url"
        }
    },
    "userType": "admin",
    "fcmTokens": ["hj3ukhjdhiku3iknju", "hj3ukhwbjwso3iknju", "hj3ukh1nso3iknju"]
}
```
Similar to the response message for succeefully sending SMS, push notification also returns similar messsage.
```
{
    "status": true,
    "data": "Message successfully sent."
}
```
The type is specified as either SMS for SMS messages or PUSH_NOTIFICATION when sending push notification, while the userIds of the recipients of the message are sent in an array. Messages can also be sent to users based on their userType, either as admin or as user.


The diagram below explains the architecture of the implementation.

https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=swvl%20flow%20chart.svg#R7VrbcuI4EP0aHkn5gg08BkgymcpMsgU7O9mXLYEF1q6xvLLMJV%2B%2FLVu%2ByJZTrgTCzNTmgchtXew%2Bffq0BD17uj3cMRT5X6iHg55leIeePetZljkwh%2FBPWI6ZZeSOMsOGEU92Kg1z8oKl0ZDWhHg4VjpySgNOItW4omGIV1yxIcboXu22poG6aoQ2uGGYr1DQtP5BPO7Lt3CM0v4Jk42fr2wa8s4W5Z2lIfaRR%2FcVk33Ts6eMUp61tocpDoTzcr9k425b7hYPxnDIuwy4XVCPTx9nn4d3D5vn6YKb%2FFvfdOTD8WP%2BxtgDB8hLyrhPNzREwU1pnTCahB4W0xpwVfZ5oDQCownGvzHnR4kmSjgFk8%2B3gbybrSkWan0XaYppwlaylzedj769mPzuz9n%2B%2BNkhvz1ff%2B%2BbhSchBDHdYs6OMI7hAHGyU%2BdHMhY2Rb9i6BMlsLJlyLi1RhI0GbWOa6hTcMQ2mMtRpdOvGUPHSrdIdIi7r%2BM6CobQyGbMryrvWJpSnPWYt7vMMnYoSKR%2FepYbgN8nHtlBcyOafWigLcA5CZdxlGJmPHIfMwEKZjuyAlbKYfAUlZH6yYw5Dr0UmH8THPOUxuLDx%2FAZUk7WZAWI0bCcXzwjQemYbADeRoAq7rxsblqyuqU%2BtEaBMsBFtO59wvE8Qmkc7iHN6YJZE7s7zDg%2BVEzNMJV3B8OWcNuXKcfKU45fTTcjoz20K1H0hiAxGl75sMTwljxgSW1IeflKv7E297wjgbzPy00uMoxWPphoUiNJxOgOtJDF0lyPbbgPnIxT%2FoQeCTdChMAAChVfacF8QEtQawUAFJBNCO0VAABctyciiIGZwbW8sSWel2GNY%2FKClul8Am2Z6mByZ9JzZlowX420Bl0KUZerKLqpo1HfuLLN3KWSSjIu3qkHtjKn7arj6XodY94IhlOk6vFPycLTsasFjpGjAGJaTid5PhUsVoO1%2FbTii%2BAzAfW693KSGpFPw1Tiku0y4%2B6aCg2df5lX%2BNlkc%2BuE69V2Qf%2FBYTlVlMR%2BQ0QvrGiOqSpaIVRVRRucS9G0pa59CSrhA%2BHfxfArR149y8lEe3aoXhzlxQmr4%2FFZ6Ad7nPGVW%2F4NVaiNbrXyqcg41pLxqVTLeh17YWqMLZUadpMZpqtjxvBstZ7bcCFtlPo1r8HLctU1MWeQl6Y0gKRkz0KR9uzJmgRBzdS9xNBhoTLyBHDkW66i9tbhYWjwsM4Gx7ABR9sG6ZcFpcYRc%2FCBoOgPSgaXq8ROIgVZJXxyLXBrQm%2B71seWYs1arCim8lpKVlmigjpG%2BNVTgaVyZCFqtHpneY5RVmUkLLZo5eHGknrHiyuNWTtdGmhYVBy0%2Buop5rlopBXrOPNpWQ0bTb9XdsLC901FgtVJFAvaxT6KhHEV0MTr6mnN9rPh%2FFZP27bq6aEmXWmr3bM5%2Boy0ePp9%2Fumvr4%2BL%2B9v76fXi%2FvFrK0mqe5Wz0uRd4I0NdTf5A9Bk%2BCOLzck1ZFhTe9etbeczcWtoiGZjUpup67n9G9RIi9uowTrNcZ5IX9UiTpPsUEofcZJZzXnwz8MckeCS53mdj%2BnUyGkP81%2FzOE%2F7vhc8zbsArU2jVhsO7Bobu%2FLaHdaLzPN8HVdfZ1D%2FSrXjc53q6zt9CZWfl%2F%2BfZDolmZYzsJ8wycBl%2BXOBrHv5owv75j8%3D


To start the app, run npm install and then enter (npm run build && npm run start) on the IDE. This will build/ compile the project files and start the application.
Testing can be done via postman by sending the request bodies shown above. 

How Other Micro-services will connect to the service.
Other servics can connect to the service through rest template. This offers an effective way to send rquests from the services while the messages or push notifications are being sent to the users in notification service.

## Future Improvement:
- The improvement to be made in future to ensure that messages are sent swiftly and the users get the response at the appropriate time. 
This will be achieved by using kafka to stream events from one service to another. This does not only increase the speed at which messages are sent but also help to process larger volume of data. With larger audience and customers, message brokers can be implemented to offer an efficient means of sending large volume of messages.

- More test cases should written to cover all functions and modules within the project

- User authentication and authorization should be implemented to control who can access the resources or endpoints.

- Real database should be implemented to store users data, which would include tokens for sending push notifications.



CURRENT_SMS_PROVIDER=sample

