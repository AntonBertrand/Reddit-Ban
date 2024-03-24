const { chromium, page } = require('playwright');
const express = require('express');
const app = express();
const port = 3000;

const userAgentStrings = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
];


app.listen(port,()=> {
console.log(`listen port ${port}`);
}) 

app.get('/shadowban/:username', (req,res)=>{

    
    const accountStatus = async (username) => {
        const browser = await chromium.launch({ headless: true})

        const context = await browser.newContext({
          userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)],
        });
        
        const page = await context.newPage();

        await page.goto(`https://www.reddit.com/user/${username}/`);

        await page.waitForLoadState('networkidle');

        const text = (await page.textContent("body"))
          .replace(/ +/g, " ")
          .replace(/(\n ?)+/g, "\n")
          .trim();
        console.log(text);

        if (await page.getByText('This account has been').isVisible()) {
          console.log(`${username} is banned!`);
          res.status(200).json(`Account is banned!`);
        } else {
          console.log(`${username} is NOT banned!`);
          res.status(200).json(`Account is NOT banned!`);
        }

        await context.close();
        await browser.close();
    }

    const { username } = req.params;
    accountStatus(username);

})