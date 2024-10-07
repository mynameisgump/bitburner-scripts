/** @param {NS} ns */
// Will nuke anything within scan range
export async function main(ns) {
  const servers = ns.scan();
  ns.tprint(servers);
  for (let i in servers) {
    const serverName = servers[i];
    if (ns.hasRootAccess(serverName) == false) {
      ns.nuke(serverName);
    }
  }
}
