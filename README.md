# api-starter-pack

How-to for Stedi APIs.

This starter-pack contains Postman collections that you can import into Postman and begin playing with.

There is some minor setup you must do.

## Setup

1. Go to terminal.stedi.com and create a user account for login.
2. Sign in to terminal.stedi.com
3. Create an `account`. If you are not prompted, click on the upper-left hand side in the drop down > click `+ Create account`.
4. Input an account name, and optionally upload an account image.
5. Click on `Identity & Access` in the left tab > `API keys`
6. Click `Generate API key` and save that key somewhere!

Now you are ready to use the postman collection. In all API calls to Stedi you must include the API key as a Header such as `"Authorization" : "Key <STEDI_API_KEY>"`.
