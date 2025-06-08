import { test as setup } from '@playwright/test';
import path from 'path'
import fs from 'fs'

const authFile='.auth/user.json'
const templateFile = path.resolve(__dirname, '../.auth/template.user.json')

setup('authentification', async({request}) => {
    
    // 1. Log in via API
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
        "user": {
                "email":"tanya_sol@test.com", 
                "password":"userway"
            }
        }
    })

    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    //2. Read a template storageState JSON (e.g. with an empty localStorage array)
    const user = JSON.parse(fs.readFileSync(templateFile, 'utf-8'));

    // 3. Inject token into localStorage value
    user.origins[0].localStorage[0].value=accessToken

    // 4. Write new storageState to authFile
    fs.writeFileSync(authFile, JSON.stringify(user, null, 2))

    console.log('access:', accessToken);
    process.env['ACCESS_TOKEN'] = accessToken

})
