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
murf4564@gasss.net,@@Masuk123#oZ,0x396637f64fb73d6d5f4f1215ff0391ee3ce19c0c
noeleon@gasss.net,@@Masuk123#oZ,0x51973c829fff6bbc27355e1a9f823b6727cb3aab
koocart4u1969@gasss.net,@@Masuk123#oZ,0xcc4a0f8a028519d53f409fc91970dda9ba08f80a
abelmns@gasss.net,@@Masuk123#oZ,0xdb7bbc99f7ab6d9ad615d7ab64634d2d07c530cd
chalusjak@gasss.net,@@Masuk123#oZ,0xa53afffdd46dd3129a3941bf4c54567d9614780f
illhan42@gasss.net,@@Masuk123#oZ,0x6957c7f58af41820699af147f733578944dc6f8d
ajeanne@gasss.net,@@Masuk123#oZ,0xbdbab131298ddc7092fc5a4d098facd34ff08bc1
verneust@gasss.net,@@Masuk123#oZ,0xc6b007eaad46c80cb3ad0177a637188dd01da833
grabarzfw@gasss.net,@@Masuk123#oZ,0xf0e9a88788c3a8e78b50bf24a7e10004715650c7
rzabifv899@gasss.net,@@Masuk123#oZ,0x1e404ccbb290757896563ef5e0fd11045367bd94
kjthomas@gasss.net,@@Masuk123#oZ,0x7eae5bd96b282d0ae6a6ead17b2f05cf7a0fcf1f
mysterious6962@gasss.net,@@Masuk123#oZ,0x587178f586c79082f0d453aca51866e2d665cd77
divefahs@gasss.net,@@Masuk123#oZ,0x72f192069a0d52b932b93357b798b6eac2e3b298
jaxrussell@gasss.net,@@Masuk123#oZ,0x45fcb9c1784f7bb29b14f50cb794db73d7eddc06
mkmarinati@gasss.net,@@Masuk123#oZ,0xac0314fe386f85a81a414724fcaade08f3868e34
jartooleto@gasss.net,@@Masuk123#oZ,0x3ab854737e86a8b9da353302a6e42474aaae0309
tieuphungtruong@gasss.net,@@Masuk123#oZ,0xb88fbd4c367965a6915ae2c16cbbf9d1492b3fac
playhard@gasss.net,@@Masuk123#oZ,0xdbcb8b800328decc7cc6ab6f983744e6ca14a060
airmetro@gasss.net,@@Masuk123#oZ,0xc622210cbbe681c9face86d773bb73bf4e1559ab
sdnbiysk@gasss.net,@@Masuk123#oZ,0x07fe67e14201edea1780eb827a41db3bd22ef63f
mmkk199819981998@gasss.net,@@Masuk123#oZ,0xd2b3f3328cde086c641b9849c09b82dadf9a0bbd
nylon4u@gasss.net,@@Masuk123#oZ,0x469f21fe39c355fde93729754a6a1fbe74ec882f
malcolma@gasss.net,@@Masuk123#oZ,0x97d478b77a9972e86facdc5cfe3170bb84e9ce59
lerakurganova@gasss.net,@@Masuk123#oZ,0x86d3f8959da59fdbdf3dc5d1489ba3ade6e145c4
werterivan@gasss.net,@@Masuk123#oZ,0xbc8822e6f525b193a807d9f83db55add5d4e788b
dmitriihlyustov@gasss.net,@@Masuk123#oZ,0xd293c70f82870e24b7bd283abffb7c447422d0e4
verovan363@gasss.net,@@Masuk123#oZ,0xa48374b60e33d61a321c75b76e37baee4ff44be8
crustyna@gasss.net,@@Masuk123#oZ,0xbb2bd23cedd7214becaa2eb02eb2207402f4f4b7
juuvai@gasss.net,@@Masuk123#oZ,0x66dee1d954933611efb7d8910ea1770e4abb231c
fogged@gasss.net,@@Masuk123#oZ,0x2efbe2f3947bfb8928923a856a025cdf85c8b8ef
adammrtn3@gasss.net,@@Masuk123#oZ,0x98207258d161354bed3e2c71df60a02ac9d2ddf7
rpointer@gasss.net,@@Masuk123#oZ,0x5ed6c268b7a622aa7fcec56c5a0bc0db41a9fe32
elenadudikova@gasss.net,@@Masuk123#oZ,0x9717d01619dfac844eb6820ff840c592b0c4b586
hughes50@gasss.net,@@Masuk123#oZ,0x7a14b779be6f53edf6cdd59923f42fe5359eaa37
gfercosini@gasss.net,@@Masuk123#oZ,0x88c0dbc7bd425e8e5f189593e11176e8430fc301
vba8c1@gasss.net,@@Masuk123#oZ,0x8442b9da307b9fc5211f6fe51a32ec8e9eb759d5
siatybasnik@gasss.net,@@Masuk123#oZ,0x9a3c78040af8456331623b3cc029b44474eb1721
17ziv@gasss.net,@@Masuk123#oZ,0x6c2dc278024884ce8d768d6efcf1a1eac10e64cb
deimos12@gasss.net,@@Masuk123#oZ,0x72bf175f14153637f604225f22872ebf99751aa4
mimic216@gasss.net,@@Masuk123#oZ,0x851a7c8e96787b5a3f3a212bf519e19848f623fc
hehehe1@gasss.net,@@Masuk123#oZ,0x60f8f4a0e0f209e895178b632685e527bf3f1170
casem63@gasss.net,@@Masuk123#oZ,0xfd6ebc4aca62df6651006a08c7e14975e9251d99
304lol@gasss.net,@@Masuk123#oZ,0x1fa47b3f2846d145cc254c35c1c42c8d3df1d3c8
romanstarikov76@gasss.net,@@Masuk123#oZ,0xee035ef4eee1b8649af4f29d03dd10e58fb8433e
newpiper@gasss.net,@@Masuk123#oZ,0x80c2f3fea901be2a04ff4f7f9c5b81a9e12d0b58
cssmithy@gasss.net,@@Masuk123#oZ,0x568ecc82f852abe0ff9049f517ca0710c7c1ed73
fotokush@gasss.net,@@Masuk123#oZ,0x1e4f27dda2c03a405311942b43873eacac6703a6
willkinn@gasss.net,@@Masuk123#oZ,0xe3be0e1bea0b8d37f0a1b1717447e594f240c24e
kiryanova173@gasss.net,@@Masuk123#oZ,0x7e987747179f2e2809d9db6564ed35e82f8627ea
nastushkatur1745fig@gasss.net,@@Masuk123#oZ,0xf5a7c58a47ab4cdd7f70d7f65f934fa60e4c5d6d
dnodes@gasss.net,@@Masuk123#oZ,0x599e2c10ee2be7b986a14880b271e5277fa120a0
bustierhor@gasss.net,@@Masuk123#oZ,0x0337cb749b90110aa612cedb261e530b580a2d92
infoho@gasss.net,@@Masuk123#oZ,0xae2c67c9f5c88c98265335c69c6a2dcb4049af72
dimyha@gasss.net,@@Masuk123#oZ,0x4a278060eb489358303b0aac12f726dfe0ca22ee
fate170790@gasss.net,@@Masuk123#oZ,0xc8e576998795da8e3975ca07b7a26dc12ed3ea18
gypsy1337@gasss.net,@@Masuk123#oZ,0x1a6a62319c65353503fbcef0106940c16e56c9f6
ywerk@gasss.net,@@Masuk123#oZ,0xf06dec8d9f0e6b3a69892a163ff1c57a0a8abd29
ivanovigor@gasss.net,@@Masuk123#oZ,0x7ac0fd6dc28dcec4a2c16ddbf7be8f314f693de1
jcmarcel@gasss.net,@@Masuk123#oZ,0x914a3ad4f88fc22b314c19bb3fc0b3d03f25dca8
sokovsergej@gasss.net,@@Masuk123#oZ,0x09f249b70264b7e762d2b0afbdd067e88cfbb407
tuqyxuda@closetab.email,@@Masuk123#oZ,0xe011b7731623963d5da9e73e85de4e846e46b8e2
vybufuno@closetab.email,@@Masuk123#oZ,0xf1bfb220ca9b7ca0a3b9848ab457385b0aaef1b3
tywiremo@closetab.email,@@Masuk123#oZ,0x4139b7d9249e2770e13d9e2fee0d2e5d5096ae54
larunyva@clip.lat,@@Masuk123#oZ,0xac88ad72ca22f5f02b838484dac0cf54cfe32c92
rotytowa@clip.lat,@@Masuk123#oZ,0x8b615a2fdfc1a353621871a1ea92c974eea4a254
lewajegi@clip.lat,@@Masuk123#oZ,0x06502318e834aee5f053442f57a9bf3d9966a5e1
hulaco@citmo.net,@@Masuk123#oZ,0xa4259f03f851b2be7edb50ddaec76e0c00ab91db
hujuxa@pelagius.net,@@Masuk123#oZ,0xf82084c04cbb6a5059cf7ee711223a764120c25c
seqako@pelagius.net,@@Masuk123#oZ,0x05466c4cafeb02d909b50c57edd6c82aa2f905ca
govuno@citmo.net,@@Masuk123#oZ,0x89230b9b9c54de60ff4bf891894133904d611743
becadimo@clip.lat,@@Masuk123#oZ,0xcb66c09312fd63a8a89bcc34a685bed21b524d2a
bihesuba@closetab.email,@@Masuk123#oZ,0xbf74dac13b8addee5d9f7b9a42da506132a266a8
curygequ@closetab.email,@@Masuk123#oZ,0xfe6e0347ed48f1df6a665d8f42abf64b7169842d
cufadeti@citmo.net,@@Masuk123#oZ,0x67fce883eb42e6b9362e8526b03a63742d903590
gofevu@pelagius.net,@@Masuk123#oZ,0x5bfa61fc28012ab8616c5af879759ec889c03040
pilagevo@imagepoet.net,@@Masuk123#oZ,0xd362de401eaec7b3fd05ee25054b468ffa6099c2
xeguzura@clip.lat,@@Masuk123#oZ,0x0a4c614d250ae4a493ab33983dbeb4f648b494e4
xovaxiqu@imagepoet.net,@@Masuk123#oZ,0xd17c4f5e09f91c0b0ba4a4bb3133bdb6a0220cd5
lafezoci@imagepoet.net,@@Masuk123#oZ,0xc0051c1390d7206e1504572516a62ef1e8cb8eeb
safyho@closetab.email,@@Masuk123#oZ,0x568a9c858d20f1f977ccd56b1619cbbab8d7a32f
ryvajypy@clip.lat,@@Masuk123#oZ,0x1d0712ba1a8a423368965b9284b0f6697166a2bc
setaluxo@clip.lat,@@Masuk123#oZ,0x5a97b87c731c0e07db18e2afefc8b7f0f886e75e
jinafyme@imagepoet.net,@@Masuk123#oZ,0x7cf9d8193e05269e7a6bd706fdf8233eb54301ee
vymukexe@clip.lat,@@Masuk123#oZ,0x0a8ef9c01745080ae10b15178c8d494b60a2728c
gijulupe@clip.lat,@@Masuk123#oZ,0x977d8a141966264656897173fabb17c5c972b074
zukiqyri@closetab.email,@@Masuk123#oZ,0xebb297e1d2784bd902210bd8685dfaa01ac69816
mojege@closetab.email,@@Masuk123#oZ,0xcd18640c66dd3808d3eb2fcd7fd253fe70361190
malijovo@pelagius.net,@@Masuk123#oZ,0xf98939b5884f66dde12712a85afdf9f96b8df1e9
bebaqa@clip.lat,@@Masuk123#oZ,0x49fbe1f17381b925ec9a9fa2354aa7ed03871492
kosiku@clip.lat,@@Masuk123#oZ,0xe26687856219e42fb91107bec8137fe402e5a284
ribugovo@clip.lat,@@Masuk123#oZ,0x2cb5a7b84fd7df4754d715306609712e14ba2e3e
zukoloko@citmo.net,@@Masuk123#oZ,0x8e53d1519233fc219ca7741ad947c065c0f597de
gafodyku@imagepoet.net,@@Masuk123#oZ,0xa31406e6507871857e7f7cae3027d29c01b7eeb5
vadebesa@citmo.net,@@Masuk123#oZ,0xb52d07e5803b60daf696bb7b442641b8b77662b1
weliwibe@clip.lat,@@Masuk123#oZ,0x448a80c95c764ceeaab870e8d1306825107be3c6
wawyfu@clip.lat,@@Masuk123#oZ,0xe36bf2ff233b04287b248017da40595f52d687bd
mecyku@imagepoet.net,@@Masuk123#oZ,0x24c81d5183895625e628021e781e2a7e94f91bdd
qikihobo@imagepoet.net,@@Masuk123#oZ,0xde650f07a58c3344a06464a267ec23ba815b1f81
butoditi@clip.lat,@@Masuk123#oZ,0xa7bfc3dbac197963be5da28afdd4ad6f96903a16
bezevomi@citmo.net,@@Masuk123#oZ,0x6af4d80c87c8855c9e4ecd5280f5ca49378dcc7c
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
