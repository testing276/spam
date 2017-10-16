const Discord = require("discord.js");
// const client = new Discord.Client();
const fs = require("fs");
const path = require('path');

var writeStream = fs.createWriteStream(path.join(__dirname, 'log_array.json'), {flags:'a'});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var server_name = '#RussianCommunity';
var admin_roles = ['Ютубер', 'Стример', 'Модератор'];
var ids = ["MzI1NjE0NjM1ODE2NTgzMTY4.DDAa2g.iVk-gUDfvVHSEkAQ1VqP-1kwRec", "MzI1Njg5ODU3Nzk0MTEzNTM3.DDAb8g.F0HAYPlwtz0g3igCzglt9NKERJI", "MzI3MDM5MjE3MTM2MDQxOTg2.DDAbRw.5RBbws6MfBuQ181o9JVDBtogfwE", "MzI3MTE0NTE5NDU5Mzk3NjMy.DDAbVw.ncvAiiXrD7X0cSceShWwfLnqumw", "MzI3MTY4MjgyMzU4NTc5MjAy.DDAbZQ.aZM6KI9XGrvZT2JopOiARryu7MA", "MzI3MTY4NjgyNjQyMTEyNTEz.DDAbdQ.Gt6AvASit4RWWkQXK-_cDSwG1Fk", "MzI3MzQ5ODQ4OTQ2NzY5OTIx.DDAbng.mBJX5WjLGu8NRWWuYAbrDiIiCFk", "MzI3NDMyMDQ0MDUxMTY5Mjgx.DDAbtA.rf0ifExaeMnaUK9Trx2PD_sntmc", "MzI3NDMyNjg2OTQ5ODkyMDk3.DDAbxQ.OEbF2n55pBXbomyX9jnfSTn7cic", "MzI3NjY5MjE2MzI2OTc1NDk4.DDAb1Q.uvpvuMcOcbUugozLPmawAWePl7o", "MzI3NjY5NzE4MzgxMjMyMTMw.DDAb5A.YYsnx-MhBbS2pN9jShxQ3fQDQj8", "MzI4OTA2NjY4MzI5MDA5MTUz.DDKuJg.xtAgid_7vNViZGfz5eQICBO5r1g", "MzI4OTA3NTY3NDAzMzY4NDUw.DDKutA.6v16KB7hwN8uvjWt5w_mfiu1iug", "MzI5MDAxNTMxNTAyMzYyNjI0.DDMGOA.PjC8jZDgPBWGAdRBN182omPaxR4", "MzI5MDAxOTE5MTkwMjY5OTY2.DDMG8g.bzAeEgxMjPKIkOK5RuInZ49uD3I", "MzI5MTU5MjE2MjUyMTkwNzIw.DDOZCw.a4C09s-t7aZGdpE3TtNQdOmoBqE", "MzI5MTU5NTYyMjgyMjcwNzIw.DDOaHQ.3y3pYEu1my4giNfC6Wue2LE3VEQ", "MzI5MTYxMzkzOTU5OTkzMzQ2.DDObjg.oA2cqa2Dr556CO-O7L30AmwB-Ms", "MzI5MjM5MTU5OTg0MDk1MjM0.DDPjfA.hVaUi7MIxPjou3l4ii1b-Vi8b6U"];

for (let id in ids) {
  start(ids[id])
}

function start(id) {
  let client = new Discord.Client();

  client.login(id);

  client.on('ready', () => {
    try {
      client.guilds.find('name', server_name).fetchMembers(undefined, 1000 + getRandomInt(1,9) * 100)
        .then(
          guild => {
            let i = 60;
            let min_timeout = 50;
            let y = 0;
            let members_ids = shuffle(Array.from(guild.members.keys()));
            let log_array = new Set(fs.readFileSync(path.join(__dirname, 'log_array.json')).toString().split('\r\n'));

            console.log(`Пользователей всего: ${members_ids.length}`);
            console.log(`Пользователей в кеше: ${log_array.size}`);

            (function members_loop (j) {
                let member = guild.members.find('id', members_ids[j]);
                log_array = new Set(fs.readFileSync(path.join(__dirname, 'log_array.json')).toString().split('\r\n'));

                // Проверка что сообщение уже было отослано
                if (log_array.has(members_ids[j])) {
                  // console.log(`Сообщение для ${member.user.username} с id ${member.user.id} уже было отослано, пропуск`);

                  if (--j) {
                    members_loop(j);
                  }
                } else {
                  // Проверка что нет роли админа
                  for (let f in admin_roles) {
                    try {
                      if (member.roles.find('name', admin_roles[f])) {
                        // console.log(member.user.username + ' с ролью ' + admin_roles[f] + ' удален из списка');

                        if (--j) {
                          members_loop(j);
                        }

                        return;
                      }
                    } catch(err) {
                      console.log(`Ошибка при попытке определить роли пользователя`);
                    }
                  }
                  setTimeout(function () {
                    try {
                      member.send(`Приветствую, ${member.user.username}!\nШлю тебе приглашение на новый сервер без регистрации, смс %%и ебанутой мочи%%.\nhttps://discord.gg/kPqzS69`)
                      // member.send(`Hey, ${member.user.username}!\nI'm looking for russian speaking guys to join our russian server, if you are interesting click that link:\nhttps://discord.gg/kPqzS69`)
                      .then(() => {
                        console.log(`${client.user.email} Сообщение отослано ${member.user.username} с id ${member.user.id}`);
                        y++;
                        if (y >= 10 && i > min_timeout) {
                          i--;
                          y = 0;
                          console.log(`Таймаут уменьшен до ${i} секунд`);
                        }
                        writeStream.write(member.user.id + '\r\n');
                      })
                      .catch(error => {
                        console.log(`${client.user.email} (${id}) Ошибка отправки сообщения ${member.user.username} - ${error.code}: ${error.message}`);
                        if (error.code === 40003) {
                          i++;
                          y = 0;
                          console.log(`Таймаут увеличен до ${i} секунд`);
                        }
                      });
                      if (--j) {
                        members_loop(j);
                      }
                    } catch(err) {
                      console.log(`Ошибка при попытке отправки сообщения пользователю`);
                    }
                  }, i * 1000)
                }
            })(members_ids.length - 1);
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        );
    } catch(err) {
      console.log(`Ошибка при подключении с id: ${id}`);
    }
  });
}
