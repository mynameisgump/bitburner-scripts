/** @param {NS} ns */

// Targeted Script from a server to begin hacking another server
const FLAGS = [
  ["t", "n00dles"],
  ["mt", 0.75],
  ["st", 5],
  ["max", false],
];

export async function main(ns) {
  const args = ns.flags(FLAGS);

  const target = args._[0];
  const moneyThreshMod = args._[1];
  const securityThreshMod = args._[2];

  const moneyThresh = ns.getServerMaxMoney(target) * moneyThreshMod;
  const securityThresh =
    ns.getServerMinSecurityLevel(target) + securityThreshMod;

  while (true) {
    const targetSec = ns.getServerSecurityLevel(target);
    const targetMon = ns.getServerMoneyAvailable(target);

    if (targetSec >= securityThresh) {
      await ns.weaken(target);
    } else if (targetMon >= moneyThresh) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}

export function autocomplete(data, args) {
  data.flags(FLAGS);
  return data.servers;
}
