
The implementation explains the logic for sending sms or push notification to users based on the provider chosen. 
The approach uses the restful api to push messages to the users that are specified in the request body. The request body is shown below;

{
    "message": "Hello there!",
    "userIds": ["abc1d", "cbrc3d", "cefc3e"],
    "allUsers": true,
    "userType": "admin",
    "type": "SMS"
}

The type is specified as either SMS or PUSH_NOTIFICATION, while the userIds of the recipients of the message are sent in an array. Messages can also be sent to users based on their userType, either as admin or as user.


The diagram below explains the architecture of the implementation.
https://user-images.githubusercontent.com/72420493/126049663-61390ae7-178f-4fe7-8de5-2b87f1ee04a9.png



To start the app, enter npm run build && npm run start on the IDE. This will build the project and start it.

How Other Micro-services will connect to the service.
Other servics can connect to the service through rest template. This offers an effective way to send rquests from the services while the messaging is being completed in notification service.

Future Improvement:
The improvement to be made in future to ensure that messages are send swiftly and the users get the response at the appropriate time is to use kafka to stream events from one service to another. This does not only increase the speed at which data is transferred but also help to process larger volume of data.

