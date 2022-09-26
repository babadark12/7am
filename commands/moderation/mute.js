const { MessageEmbed } = require("discord.js");
const discord = require("discord.js")
const { Permissions } = require('discord.js');
const { color } = require("../../config.json");

let red = "#F04A47"
let green = "#43B581"
let yellow = "#FFFF00"
module.exports = {
 name: "mute",
 description: "Mute anyone who break rules",
 category: "moderation",
 usage: "mute <@mention> <reason>",
 run: async (client, message, args) => {

    let check = "✅"
    let cross = "❌"
    let warn = "⭕"
  try {
    


    if (!message.member.permissions.has("MANAGE_ROLES")) {
      const embed = new MessageEmbed()
        .setDescription(`**${cross} You do not have Manage roles permissions**`)
        .setColor(red)
      return message.channel.send({ embeds: [embed] })
    }

     if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      const embed = new MessageEmbed()
        .setDescription(`**${cross} I do not have Manage roles permissions**`)
        .setColor(red)
      return message.channel.send({ embeds: [embed] })
      }

   const target = message.mentions.members.first()
    if (!target) {
      let embed = new MessageEmbed()
        .setDescription(`${cross} **You must mention the person you want muted**`)
        .setColor(red)
     return message.channel.send({ embeds: [embed] })
    }

    if (target.id === message.member.id) {
      let embed = new MessageEmbed()
        .setDescription(`${cross} **You can not mute yourself**`)
        .setColor(red)
     return message.channel.send({ embeds: [embed] })
    }


    if (target.id === client.user.id) {
      let embed = new MessageEmbed()
        .setDescription(`${cross} **You must mute the interaction manually**`)
        .setColor(red)
     return message.channel.send({ embeds: [embed] })
    }  

  let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
  if(!muterole) {
  let embed = new MessageEmbed()
        .setDescription(`${cross} **Server does not have a role named \`Muted\`**`)
        .setColor(red)
  return message.channel.send({ embeds: [embed] })
  }

const role = await message.guild.roles.fetch(muterole.id) 
 if(target.roles.cache.get(role)) {
 let embed = new MessageEmbed()
        .setDescription(`${cross} **User is already muted**`)
        .setColor(red)
 return message.channel.send({ embeds: [embed] })
 }

 
target.roles.add(role)
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No reason provided by moderator"
  
   try {

    let embed = new MessageEmbed()
          .setDescription(`**${warn} You have been muted in ${message.guild.name} for ${reason}**`)
          .setColor(yellow)
    target.send({ embeds: [embed] })


    } catch (err) {
     console.log(err)
     message.channel.send(`\`\`\`js\n${err.message}\n\`\`\``)
    }

    const embed = new MessageEmbed()
        .setDescription(`**${check} I have successfully muted the user**`)
        .setColor(green)
      message.channel.send({ embeds: [embed] })

  } catch (err) {
    console.log(err)
    let check = client.emojis.cache.get("✅");
    let cross = client.emojis.cache.get("❌");
    let warn = client.emojis.cache.get("⭕");
    
 let embed = new MessageEmbed()
        .setDescription(`${cross} **An error occured**`)
        .setColor(red)
 return message.channel.send({ embeds: [embed] })
  }
     
 }
};
