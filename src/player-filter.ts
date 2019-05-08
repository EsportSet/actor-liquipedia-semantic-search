// return true if this player pass filters
export default function playerFilter(
  player: Record<string, any>,
  filter?: Record<string, any>
): boolean {
  //
  if (!player || !player.printouts) return false;
  //
  if (!filter) return true;
  //
  if (filter.onlyStatusActive && player.printouts['Has status'][0] !== 'Active')
    return false;
  //
  if (filter.noCoach && player.printouts['Has role'][0] === 'Coach')
    return false;
  if (filter.noCaster && player.printouts['Has role'][0] === 'Caster')
    return false;
  if (filter.noHost && player.printouts['Has role'][0] === 'Host') return false;
  if (filter.noObserver && player.printouts['Has role'][0] === 'noObserver')
    return false;
  //
  if (filter.haveTeam && !player.printouts['Has team'][0]) return false;
  //
  return true;
}
