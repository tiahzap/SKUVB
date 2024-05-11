const bluebird = require("bluebird");
const fs = require("fs");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const puppeteer = require("puppeteer-extra");
const useProxy = require("@stableproxy/puppeteer-page-proxy");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const IDRIVE_ENPOINT = "d4b6.or4.idrivee2-60.com";
const IDRIVE_ACCESS_KEY_ID = "5ce3lLJdmdBVLqcX7RPD";
const IDRIVE_SECRET_ACCESS_KEY = "a6USwSGtrxBDlV2n19XUJWcMt69ivtpu5zm63Hfi";
const BUCKET_NAME = "alchemy-dwi-cookies";

const CONCURENCY = 2;
const HEADLESS = false; // HEADLESS  false or false;

const USE_PROXY = false;
const PROTOCOL = "http";
const PROXY_HOST = "gate.smartproxy.com";
const PROXY_PORT = "7000";
const PROXY_USERNAME = "spoj3coqzt";
const PROXY_PASSWORD = "ttZaB35y17tG~Ocsdw";

const dataAccount = `
uaaheyb@merepost.com,@@Masuk123#12a,0x5bd72e580a5ff9dc6e862da016975b8c8fe7ff35
uteka@fexbox.org,@@Masuk123#12a,0xe814d9c77f2a63b5ee2511392ec240d6e43bb1e9
oofwu@chitthi.in,@@Masuk123#12a,0xc7a6185ba0f89f9678baaf0edcfdaed1dd07e3cb
ohxytx@any.pink,@@Masuk123#12a,0xdcc219c6a3ffac1bd6b472ef6bff87b20690b000
scypdf@merepost.com,@@Masuk123#12a,0xd047de345e5b7d066652b1243aa654a639c55317
equhogy@fexbox.org,@@Masuk123#12a,0xd78c932c1bd9e2720a2d75e14c3f0742535a4393
hhnucum@fextemp.com,@@Masuk123#12a,0x3244e588c90e48510fd95408f1011d6a630a52f9
akupyz@fexpost.com,@@Masuk123#12a,0x52f77033e4deea488a45ac194428cf6292dd1c5a
myecy@rover.info,@@Masuk123#12a,0x25a62dd442fd0c8c32fdb86b9cdd2a35dea56e04
aeupqot@chitthi.in,@@Masuk123#12a,0x8f43e9eab398fee12ca62cf50b1ff528701dcc65
domonog@merepost.com,@@Masuk123#12a,0x779c58fd49f234d35f1e265f7e4ff5e5cd9fe5fe
ybexawa@any.pink,@@Masuk123#12a,0xa0416710a88e78f30f421456b3e6c28e527cb1b7
aexeenx@fexbox.org,@@Masuk123#12a,0xf9b752ee70e71fc017efb119dd67fbeb0a09cc60
modtabe@rover.info,@@Masuk123#12a,0xc96d95918764d4b72602ff92d5d27a9ad63fd536
uawku@mailbox.in.ua,@@Masuk123#12a,0xdfbd6f032709c58ef7bb7fbcb5a6c39ef2ae8aaf
aemox@mailto.plus,@@Masuk123#12a,0x6d0de804eb222679536e6657e21e2a1477e7c445
atodz@rover.info,@@Masuk123#12a,0x399fd2b9a427a1fcc6661b48b31a054c6d7f06fc
sanbu@any.pink,@@Masuk123#12a,0x40a96b0ab1afcc7ab8fd4ae9a32c155dff3a1bfa
exyyfw@mailto.plus,@@Masuk123#12a,0xfda91038866609964994f856f14246a7d76b989c
xunpyv@mailbox.in.ua,@@Masuk123#12a,0xa474e4e20a7e905790efd96e04e569a51bbf66e8
efkuzo@merepost.com,@@Masuk123#12a,0x287c11d601277ea43bd62e26637f2dd3cb2b66e0
hohfat@fexpost.com,@@Masuk123#12a,0x8ab675b2f9b5f1be1944342adebab4694919759c
ebzhta@chitthi.in,@@Masuk123#12a,0x8be9f8c650632d9a8fd788686547eb070a5b5941
bhobast@chitthi.in,@@Masuk123#12a,0xf0c2662835c6a9259b23375d0b3032b10b8cc327
ecgoz@mailto.plus,@@Masuk123#12a,0x895a5bd79e503a7c61d9ef32a1e53583b17811d3
ecyzt@fexbox.org,@@Masuk123#12a,0x1e5014342f294eebf235b8c209ff18f6c5ecce54
oebux@chitthi.in,@@Masuk123#12a,0xfba60c865a3230b7da52de7f136326824f2a0262
smwod@rover.info,@@Masuk123#12a,0x4cda15f625cab7df1995cf1c9641515d8fa9af22
ecubeu@mailto.plus,@@Masuk123#12a,0xbf7d33b86fade8c47a004af8bf3802f588236d9b
ofqef@fexbox.org,@@Masuk123#12a,0xf93bb2114061e420a869afef855552104baa4c75
anefodu@mailbox.in.ua,@@Masuk123#12a,0xa4198d97d5155f3682e0449aab8e41158dbdff7b
aurvandil@mylandjet.com,@@Masuk123#oZ,0x1edcbf7b10d3908a89a762258a7ca0bba1afb2c7
stsergei@mylandjet.com,@@Masuk123#oZ,0xb46866634afa45c5fb4bcf47ce136ec938d3cd7d
kaiguytest@mylandjet.com,@@Masuk123#oZ,0xf6976bc05bca593a9749fef1ffbb5c62f8ccb6f4
duguerreroxd@mylandjet.com,@@Masuk123#oZ,0xcc8ea12029d4ea8b9f33760bf19863469cac783b
lubocka10@mylandjet.com,@@Masuk123#oZ,0x593fc6f5ddb11223b48717620826987089be826e
vsleepwalker@mylandjet.com,@@Masuk123#oZ,0x07152eaa78accd28576ecab204f0d563850a5dd5
hy9566@mylandjet.com,@@Masuk123#oZ,0x0dbcd66773bab9e0da6e3d3f89e7daadddeacf0d
katscustoms@mylandjet.com,@@Masuk123#oZ,0xe74ccfca8d3bda4e65206c0336fb8e97fb7a9ca4
blackeddy@mylandjet.com,@@Masuk123#oZ,0x071147ecd7188a943fd98d72179aae9da2ecb420
1090page@mylandjet.com,@@Masuk123#oZ,0xdfd728e2d74d17924fea89f2517af2f7b613dbac
lisaepps@mylandjet.com,@@Masuk123#oZ,0x1f61f81375cec73fd16caab91618aad800ae0120
klward74@mylandjet.com,@@Masuk123#oZ,0xead70fbfe38f759fcf3aff45ae2db9b32213d26c
lamulata6@mylandjet.com,@@Masuk123#oZ,0xf7364c119aaedd668391794cf47b983073402cf5
fozman@mylandjet.com,@@Masuk123#oZ,0xf4ac56595cce09ea41441df2c19cc7e3a63d5c20
jcowel26@mylandjet.com,@@Masuk123#oZ,0x4c66ab9af2340e680eccb1b315e94b6458aeb78a
polaphats@mylandjet.com,@@Masuk123#oZ,0xed31e5c6fa434b2130769e1c1a7c682e26a48c18
phwfh@mylandjet.com,@@Masuk123#oZ,0xda53b4a56cf66e31c8647e8bdbf04c66c124b2ef
nareknaki@mylandjet.com,@@Masuk123#oZ,0x7b10e168fa47e750a742787f4826156dbc11abae
kiksdomo@mylandjet.com,@@Masuk123#oZ,0x5b609ed337bfc09409393fb367642257cb20bae1
sadebates08@mylandjet.com,@@Masuk123#oZ,0x60bd1f8abe82299206e56b9e5d52631b240099fa
julioapaes@mylandjet.com,@@Masuk123#oZ,0xd4ea6f17034ea356b87d3a6677e97a0c0e058897
rayray3840@mylandjet.com,@@Masuk123#oZ,0x7f1401eee2aa0a9d6ab45ad286da10d7d76f8bc2
mywodnjs89@mylandjet.com,@@Masuk123#oZ,0x9e67d23a9c7401c426106a3fca5588c00107ca2e
set239@mylandjet.com,@@Masuk123#oZ,0x47af85dc67806a741cbf6332d8a99a4e56770393
mariaych@mylandjet.com,@@Masuk123#oZ,0x6018ac1e8661f02392f8bebd9d74c47e219ccf78
rijenkya61@mylandjet.com,@@Masuk123#oZ,0x9fb42f28324c9825d45cd8a6b703507c36fbcf33
dirtypaer35@mylandjet.com,@@Masuk123#oZ,0xeeebfd6d8a88646e7645764e6da70e53f9a6afc6
poleshukolga@mylandjet.com,@@Masuk123#oZ,0xb23be04e2354d250598b1b1ae76d0eaf6cf471a6
limizolda@mylandjet.com,@@Masuk123#oZ,0x32f70a0f910fbff9e996804a2255fc897862c464
pohodyashiiserg@mylandjet.com,@@Masuk123#oZ,0xe990b1913b62f42abcb303d3ab193f13f0d6a929
masters@mylandjet.com,@@Masuk123#oZ,0xae020fb41b938b345f1db864b896e4267419a3ff
markverevka@mylandjet.com,@@Masuk123#oZ,0xf319da23e5c1081494d48d92feda5af19be841f2
sdgghh@mylandjet.com,@@Masuk123#oZ,0xff2ce857a0c48178d0230f748b4cb87751a8c966
filgueira271@mylandjet.com,@@Masuk123#oZ,0x7a122d7a36fd033e3bc80b82b7382639bdb2699e
dnskzntcv@mylandjet.com,@@Masuk123#oZ,0x05cdd88194ffdb68a50b3c15bc6a07d4f60acff9
1672696@mylandjet.com,@@Masuk123#oZ,0x3a817541990bc9fadd1f8289b1604bc5c0a2ea03
krisnjer@mylandjet.com,@@Masuk123#oZ,0x73767094cf0e9fbc2714c656437c79d052682821
smetalyubov@mylandjet.com,@@Masuk123#oZ,0xf1bfe824bde6c90d3d36e25f5e3f2710d10b25ef
mixailcotow@mylandjet.com,@@Masuk123#oZ,0x56687390777dbdcad389edd0ec789c8fdcbdd06c
caatues@mylandjet.com,@@Masuk123#oZ,0xa428b12272dff0609340b68d9db0676b587a03f1
deal77@mylandjet.com,@@Masuk123#oZ,0xdda52647367320df3580d5bd307b2b74aa81d564
ssjin4gojita@mylandjet.com,@@Masuk123#oZ,0xc304d04060f94560c0e0a1c016a8ed4a0152a826
ville25@mylandjet.com,@@Masuk123#oZ,0x1ddd9e95b1ef9ebc30afd0bcf3de264a49a029e3
2y4ae1@mylandjet.com,@@Masuk123#oZ,0x624599a5018ecd1dcbe851f72f6492bdb9bf65cc
terry2021@mylandjet.com,@@Masuk123#oZ,0xa8ea561af0a53fd2ec1f05b2a41dbd31d1fac87c
rrcomand@mylandjet.com,@@Masuk123#oZ,0x581883cbb16ed70909c55b5f4eb1ccadf33803eb
jura72@mylandjet.com,@@Masuk123#oZ,0xf905ca3a8fb53b30d2965f027948381dc152b1e2
ajpricez@mylandjet.com,@@Masuk123#oZ,0xf7a19db4cce223162e823221eb349c7efa86e093
evysch@mylandjet.com,@@Masuk123#oZ,0x96ea6dcf69a361d93ad3871784512fd62ee3f1fd
cptvideo@mylandjet.com,@@Masuk123#oZ,0xba365a287c1403f64b46c0fe4cd326241c18702f
theresekelly@mylandjet.com,@@Masuk123#oZ,0x0ed2b831a595e6b6cfcf3fe988d103ae029c2e5e
dominator1979@mylandjet.com,@@Masuk123#oZ,0xe62132f41cbd01b90e23be1d7a4e25dff9a736f0
juratitan@mylandjet.com,@@Masuk123#oZ,0x23ca98db09ad721e94917e559e7a6ce43c25a64c
ais03253sp@mylandjet.com,@@Masuk123#oZ,0x2a8b7685587337c445b42e71727e12b77f239a67
hamand085@gasss.net,@@Masuk123#oZ,0x980ed8be16cd34916fd7424d85b0fc82dce5ead4
chuck16@gasss.net,@@Masuk123#oZ,0x65b8daa67c626fd75c2572a8a680586fae268dfb
zanox@gasss.net,@@Masuk123#oZ,0xa30e77bd63396da0b72364df9471799cdff9d527
driesbonte@gasss.net,@@Masuk123#oZ,0xe75d2d4e36a54cf83494155386f324e64d9f34ec
j8daniel@gasss.net,@@Masuk123#oZ,0xf5577d13956b414e581af77849aeb853bb8fac6f
david60015@gasss.net,@@Masuk123#oZ,0x238355cf48f89b07aaf001cd0b9f7826001ed239
agba9wl@gasss.net,@@Masuk123#oZ,0xaddefaabad957fa511d32eff2f9e6eedc9ee9a67
flyinduke@gasss.net,@@Masuk123#oZ,0x70f5497b4d8075396715e7dab12bf09bc762eb36
4u128555@gasss.net,@@Masuk123#oZ,0xb4c3e0b5e40014f49144a322916dcf7e990bb490
markdear@gasss.net,@@Masuk123#oZ,0x224654f3bfa44d9a6adc9c69abd9e8df426596ba
1787mircoda@gasss.net,@@Masuk123#oZ,0xa98b421f88099d1a1ba9eac265254d6e56689c81
tanchikgrin@gasss.net,@@Masuk123#oZ,0xdaa7f7d1d074851e32f4c6211e04bfaf6a428546
bailo1@gasss.net,@@Masuk123#oZ,0xd41f1482b9ada0217d232ebf1f7c4c5313ecc934
gischar@gasss.net,@@Masuk123#oZ,0xd25ed8093183f33129296da4c4fb87f81e346851
cmurphy112@gasss.net,@@Masuk123#oZ,0xfef938f23e2e8d20fda81970d04b1a29851951c8
`;

const waiting = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getData = (data, start, end) => {
  const splitData = data.split(/\r?\n/).filter((n) => n);
  const sliceData = splitData.slice(start, end);
  return sliceData;
};

const s3 = () => {
  const endpoint = new AWS.Endpoint(IDRIVE_ENPOINT);
  const s3 = new AWS.S3({
    endpoint: endpoint,
    accessKeyId: IDRIVE_ACCESS_KEY_ID,
    secretAccessKey: IDRIVE_SECRET_ACCESS_KEY,
  });

  return s3;
};

const existsBucket = async (bucketName) => {
  try {
    await listObjects(bucketName);

    return true;
  } catch (err) {
    if (err.code == "NoSuchBucket") {
      return false;
    } else {
      throw err;
    }
  }
};

const listObjects = (bucketName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
    };

    s3().listObjects(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getObject = (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
    };

    s3().getObject(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createObject = async (obj, bucketName, fileName) => {
  const buf = Buffer.from(JSON.stringify(obj));

  return new Promise((resolve, reject) => {
    const data = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "application/json",
      ACL: "private",
    };

    s3().upload(data, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const checkExistsObject = async (bucketName, fileName) => {
  try {
    await getObject(bucketName, fileName);

    return true;
  } catch (err) {
    if (err && (err.code == "NoSuchKey" || err.code == "NoSuchBucket"))
      return false;
  }
};

const saveCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const reaponseCookies = await session.send("Network.getAllCookies");

  await session.detach();
  await createObject(reaponseCookies.cookies, BUCKET_NAME, cookieFile);
};

const loadCookies = async (page, cookieFile) => {
  const session = await page.target().createCDPSession();
  const cookies = JSON.parse(cookieFile);
  await session.send("Network.setCookies", {
    cookies: cookies,
  });
  await session.detach();
};

const retryElement = async (page, element, xpath = false, retryCount = 1) => {
  try {
    if (xpath) {
      return await page.waitForXPath(element, { timeout: 8000 });
    } else {
      return await page.waitForSelector(element, { timeout: 8000 });
    }
  } catch (err) {
    if (retryCount <= 0) {
      throw err;
    }
    const currentUrl = await page.url();
    await page.goto(currentUrl, { waitUntil: "networkidle2" });

    return await retryElement(page, element, (xpath = false), retryCount - 1);
  }
};

const launchBrowser = async () => {
  try {
    let browser;

    let args = [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-notifications",
      "--no-first-run",
      "--disable-gpu",
      // "--start-maximized",
      "--disable-infobars",
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
      "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
      "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
    ];

    const proxyHost = `${PROTOCOL}://${PROXY_HOST}:${PROXY_PORT}`;

    USE_PROXY ? args.push(`--proxy-server=${proxyHost}`) : null;

    let browserOptions = {
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: HEADLESS,
      ignoreHTTPSErrors: true,
      acceptInsecureCerts: true,
      defaultViewport: null,
      args: args,
    };

    browser = await puppeteer.launch(browserOptions);
    const context = browser.defaultBrowserContext();

    context.overridePermissions("https://auth.alchemy.com", [
      "geolocation",
      "notifications",
    ]);
    context.overridePermissions("https://www.alchemy.com", [
      "geolocation",
      "notifications",
    ]);

    const [page] = await browser.pages();

    if (USE_PROXY) {
      await page.authenticate({
        username: PROXY_USERNAME,
        password: PROXY_PASSWORD,
      });
    }

    await page.setRequestInterception(true);
    const rejectRequestPattern = [
      "googlesyndication.com",
      "/*.doubleclick.net",
      "/*.amazon-adsystem.com",
      "/*.adnxs.com",
      "/*.ads.net",
    ];
    const blockList = [];
    page.on("request", (request) => {
      if (
        rejectRequestPattern.find((pattern) => request.url().match(pattern))
      ) {
        blockList.push(request.url());
        request.abort();
      } else request.continue();
    });

    return { page, browser };
  } catch (err) {
    console.log(`Browser ${err}`);
  }
};

const login = async (page, email, password) => {
  try {
    await page.goto("https://www.alchemy.com/faucets/arbitrum-sepolia", {
      waitUntil: "networkidle2",
    });

    const cookieFile = `${email}.json`;

    const isExistCookies = await checkExistsObject(BUCKET_NAME, cookieFile);

    if (isExistCookies) {
      const getCookies = await getObject(BUCKET_NAME, cookieFile);
      const cookies = getCookies.Body.toString("utf-8");
      await loadCookies(page, cookies);
    }

    await waiting(5000);

    const logoutButtonElm = await page.$$eval("button", (button) => {
      const logoutButton = button.find(
        (btn) => btn.textContent.trim() == "Logout"
      );

      if (logoutButton) {
        return true;
      }

      return false;
    });

    if (logoutButtonElm) {
      return true;
    }

    await page.$$eval("button", (button) => {
      const loginButton = button.find(
        (btn) => btn.textContent.trim() == "Alchemy Login"
      );

      if (loginButton) {
        loginButton.focus();
        loginButton.click();
      }
    });

    await waiting(10000);

    try {
      await retryElement(page, 'input[type="email"]');

      const inputUser = await page.$('input[type="email"]');
      await page.evaluate((user) => {
        user.focus();
        user.click();
      }, inputUser);
      await page.keyboard.type(email);

      const inputPass = await page.$('input[type="password"]');
      await page.evaluate((pass) => {
        pass.focus();
        pass.click();
      }, inputPass);
      await page.keyboard.type(password);

      await page.waitForSelector('button[type="submit"]');
      const buttonLogin = await page.$('button[type="submit"]');

      await page.evaluate((login) => {
        login.click();
      }, buttonLogin);

      await waiting(15000);

      await saveCookies(page, cookieFile);
    } catch (err) {}

    return true;
  } catch (err) {
    console.log(`[${email}] - Login error ${err}`);
  }
};
const claimFoucet = async (page, email, wallet) => {
  let success = false;
  let retry = 0;
  let maxTry = 3;
  let message = "";

  try {
    while (!success && retry <= maxTry) {
      await waiting(2000);

      await retryElement(page, 'form input[type="text"]');
      const walletInputElm = await page.$('form input[type="text"]');

      await page.evaluate((walletInput) => {
        walletInput.focus();
        walletInput.click();
      }, walletInputElm);

      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
      await page.keyboard.sendCharacter(wallet);

      await page.waitForXPath('//div/button[contains(., "Send Me ETH")]');

      const [sendButtonElm] = await page.$x(
        '//div/button[contains(., "Send Me ETH")]'
      );

      await waiting(2000);

      await sendButtonElm.click();

      await waiting(4000);

      const successClaimElm = await page.$x(
        '//*[@id="root"]/div[1]/div[2]/div[3]/div[2]/div/div[2]/div/div[2]'
      );

      if (successClaimElm !== "undefined" && successClaimElm.length > 0) {
        console.log(`[${email}] - BERHASIL CLAIM ARBIT !!`);
        success = true;
        return true;
      } else {
        const [spanMessageElm] = await page.$x('//div[@role="alert"]/span');

        let textMessage = await page.evaluate(
          (element) => element.textContent.trim(),
          spanMessageElm
        );

        message = textMessage;

        retry++;

        await waiting(3000);
      }
    }

    console.log(`[${email}] - GAGAL CLAIM ARBIT ${message}`);
    return true;
  } catch (err) {
    console.log(`[${email}] - TERJADI ERROR: ${err}`);
  }
};

const bot = async (page, account) => {
  let success = false;
  try {
    await page.bringToFront();
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await client.send("Page.enable");
    await client.send("Page.setWebLifecycleState", { state: "active" });

    const data = account.split(",");
    const email = data[0];
    const password = data[1];
    const wallet = data[2];

    const sigin = await login(page, email, password);

    if (sigin) {
      success = await claimFoucet(page, email, wallet);
    }

    return success;
  } catch (err) {
    console.log(err);
  }
};
(async () => {
  const args = process.argv;

  // const startData = parseInt(args[2]);
  // const endData = parseInt(args[3]);

  // if (!startData && !endData) {
  //   console.log(`Params require "node run.js 0 5"`);
  //   process.exit();
  // }

  // For github action
  const rangeDate = process.env.RANGE_INDEX;
  const splitDate = rangeDate.split(",");
  const startData = splitDate[0];
  const endData = splitDate[1];

  const accounts = getData(dataAccount, startData, endData);

  return bluebird.map(
    accounts,
    async (account) => {
      const { page, browser } = await launchBrowser();

      try {
        await bot(page, account);
      } catch (err) {
        await browser.close();
      }

      await browser.close();
    },
    { concurrency: CONCURENCY }
  );
})();
