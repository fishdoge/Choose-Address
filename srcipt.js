const {Web3} = require("web3");
const fs = require("fs");
const web3 = new Web3('http://localhost:8545');

async function getaccount(InputAddress,ln){

    let check = 0;

    while(true){
        check++;
        const account = await web3.eth.accounts.create();
        let choseaddress = account.address;
        choseaddress = choseaddress.substring(0,ln);

        if(choseaddress == InputAddress){

            let addressinfo = {
                Account:account.address,
                PrivateKey:account.privateKey
            };

            console.log(addressinfo);

            fs.appendFile('./key.json',  `\r\n${JSON.stringify(addressinfo)}`, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('找到了並且寫入成功');
                    console.log('尋找次數',check);
                    console.log('地址: ',account.address);
                    console.log('PrivateKey',account.privateKey);
            });

            break;
        }

    }
}


const readline = require ('readline').createInterface({
    input : process.stdin,
    output : process.stdout
})

readline.question( `輸入你要的address開頭,建議不要輸入超過八位數 EX : 0x11111 輸入:\r\n`, addr => {

    console.log(`開始尋找 ${ addr } 開頭的address.. `)
    console.log(`搜尋長度 ${addr.length} 期望運算次數 ${Math.pow(16, addr.length - 2)}`);
    getaccount(addr,addr.length);
    readline.close();
})
