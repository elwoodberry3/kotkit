# APPWRITE
Prompt

In this new application we began by creating an account with AppWrite (appwrite.io).
We then created a new project with the following details:
**New Project Name**: "Kround Application"
**Project ID**: "kround"
**Deployment Region**: "Frankfurt, Germany"
**Platform**: "Web"
**Web App Name**: "KROUND"
**Hostname**: "localhost"

Next, we created a new database named "Kround" with a database ID of "kround".

For this database we created a collection name "**Profile**".
For "**Profile**", we created the following attributes.
 - A string with an attribute key (‘image’) and size (‘30’) which is required.
 - A string with an attribute key (‘bio’) and size (‘80’) which is not required.
 - A string with an attribute key (‘user_id’) and size (‘30’) which is not required.
 - A string with an attribute key (‘name’) and size (‘50’) which is required.

For "**Profile**", we created the following indexes.
 - Index Key ('user_id') with a type of 'Key' with an attribute of 'user_id'
 - Index Key ('name') with a type of 'FullText' with an attribute of 'name'

For "**Profile**", we updated the permissions by adding the following roles:
 - Any can Read
 - All Users can Create, Read, Update and Delete

For this database we created a collection name "**Like**".
For "**Like**", we created the following attributes.
 - A string with an attribute key (‘user_id’) and size (‘30’) which is required.
 - A string with an attribute key (‘post_id’) and size (‘30’) which is required.

For "**Like**", we created the following indexes.
 - Index Key ('user_id') with a type of 'Key' with an attribute of 'user_id'
 - Index Key ('id') with a type of 'Unique' with an attribute of '$id'
 - Index Key ('post_id') with a type of 'Key' with an attribute of 'post_id'

For "**Like**", we updated the permissions by adding the following roles:
 - Any can Read
 - All Users can Create, Read, Update and Delete

For this database we created a collection name "**Post**".
For "**Post**", we created the following attributes.
 - A string with an attribute key (‘user_id’) and size (‘30’) which is required.
 - A string with an attribute key (‘video_url’) and size (‘30’) which is required.
 - A string with an attribute key (‘text’) and size (‘150’) which is required.
 - A DateTime with an attribute key (‘created_at’) and size (‘150’) which is required.

For "**Post**", we created the following indexes.
 - Index Key ('user_id') with a type of 'Key' with an attribute of 'user_id'

For "**Post**", we updated the permissions by adding the following roles:
 - Any can Read
 - All Users can Create, Read, Update and Delete

For this database we created a collection name "**Comment**".
For "**Comment**", we created the following attributes.
 - A string with an attribute key (‘user_id’) and size (‘30’) which is required.
 - A string with an attribute key (‘post_id’) and size (‘30’) which is required.
 - A string with an attribute key (‘text’) and size (‘30’) which is required.
 - A DateTime with an attribute key (‘created_at’) and size (‘150’) which is required.

For "**Comment**", we created the following indexes.
 - Index Key ('post_id') with a type of 'Key' with an attribute of 'post_id'

For "**Comment**", we updated the permissions by adding the following roles:
 - Any can Read
 - All Users can Create, Read, Update and Delete


Finally, for this database we created a storage bucket named **kround**.
We created a default file for every user that registers an account ('/public/images/placeholder-user.jpg')



Next, we created an environment file ('/.env')
```bash
NEXT_PUBLIC_APPWRITE_URL='https://cloud.appwrite.io/v1'
NEXT_PUBLIC_ENDPOINT='kround'
NEXT_PUBLIC_DATABASE_ID='kround'

NEXT_PUBLIC_COLLECTION_ID_COMMENT='6798cd5c001174b39d35'
NEXT_PUBLIC_COLLECTION_ID_POST='6798ccac0004c3af7e49'
NEXT_PUBLIC_COLLECTION_ID_LIKE='67989cdd0038ad99762f'
NEXT_PUBLIC_COLLECTION_ID_PROFILE='679897de0009fbfa01a7'

NEXT_PUBLIC_BUCKET_NAME="kroud"
NEXT_PUBLIC_BUCKET_ID='6798cf06003281b48800'
NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID='6798cfa7003b284a0f9f'
```  





Next, we installed AppWrite in our project which updated './package.json'
```bash
npm install appwrite
```  





We then created '/libs/AppWriteClient.tsx'
```bash
import { Account, Client, ID, Databases, Query, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
    .setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID }
``` 


Explain the addition and the updates