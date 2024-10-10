/** @param {NS} ns */
// Will nuke anything within scan range
// V0
// No port openings
export async function main(ns) {
  const servers = ns.scan();
  ns.tprint(servers);
  for (let i in servers) {
    const serverName = servers[i];
    const server = ns.getServer(serverName);
    const player = ns.getPlayer();

    ns.tprint(server);

    const reqOpenPorts = server.numOpenPortsRequired;
    const openPortCount = server.openPortCount;

    const requiredHackingLevel = server.requiredHackingSkill;
    const curHackingLevel = player.skills.hacking;

    ns.tprint(
      reqOpenPorts,
      " ",
      openPortCount,
      " ",
      requiredHackingLevel,
      " ",
      curHackingLevel
    );

    if (openPortCount >= reqOpenPorts) {
      if (curHackingLevel >= requiredHackingLevel) {
        if (ns.hasRootAccess(serverName) == false) {
          ns.nuke(serverName);
        }
      }
    }
  }
}
