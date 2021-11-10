const puppeteer = require('puppeteer');
var ips = require('./ips.js');


(async () => {
  const browser = await puppeteer.launch({
      headless: false,
      devtools: false,
      ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();
  await page.goto('https://manage.brekor.com/clientarea.php?action=productdetails&id=221');
  //await page.goto('https://privafl-900.privatednsorg.com:2083/cpsess9943412624/frontend/paper_lantern/zone_editor/index.html#/manage?domain=wiber.net.ar');

  let pages1 = await browser.pages();
  console.log("primer array");
  console.log("current page count ", (await browser.pages()).length); // 2


  await page.waitForSelector('#inputEmail');
  await page.type('#inputEmail', "")
  await page.type('#inputPassword', "")
  await page.click('[id="login"]')

  await page.waitForSelector('#Primary_Sidebar-Service_Details_Actions-Login_to_cPanel');
  await page.click('[id="Primary_Sidebar-Service_Details_Actions-Login_to_cPanel"]')

  await page.waitFor(5000);
  let pages = await browser.pages();

  console.log("segundo array");
  console.log("current page count ", (pages.length)); // 3

  const tab2 = pages[2];

  await tab2.waitForSelector('#item_zone_editor');
  await tab2.click('[id="item_zone_editor"]')
  await tab2.waitForSelector('#manage_for_wiber_net_ar');
  await tab2.click('[id="manage_for_wiber_net_ar"]');

  //en el loop


      (async function () {
          for (var i = 0; i < ips.length; i++) {

              let ip = ips[i];
              console.log(ip);

              let rregister = ip.replace(/\./g, "-") + ".wiber.net.ar"
              console.log(rregister);

              await tab2.waitForSelector('#search_add_record_btn');
              await tab2.waitFor(2000);
              await tab2.click('[id="search_add_record_btn"]')
              console.log("LISTO PARA AGREGAR");

              await tab2.waitForSelector('#recordName_0');
              await tab2.type('#recordName_0', rregister)
              await tab2.select('#recordType_0', 'A')
              await tab2.type('#record_a_address_0', ip)
              await tab2.click('[id="inline_add_record_button_0"]')
              await tab2.waitFor(2000);

          }
      })();



  //await browser.close();
})();