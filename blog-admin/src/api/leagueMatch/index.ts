import { defHttp } from '/@/utils/http/axios';
import { leagueMatch } from './const';

// 联赛列表
export function leagueMatchList(params) {
  return defHttp.get({
    url: leagueMatch.LEAGUE_MATCH_LIST,
    params,
  });
}

// 联赛列表
export function leagueMatchUpdateSort(params) {
  return defHttp.post({
    url: leagueMatch.LEAGUE_MATCH_UPDATE_SORT,
    params,
  });
}

// 推荐联赛
export function leagueMatchRecommend() {
  return defHttp.get({
    url: leagueMatch.LEAGUE_MATCH_RECOMMEND,
  });
}

// 球队列表
export function leagueMatchTeamList(params) {
  return defHttp.get({
    url: leagueMatch.LEAGUE_MATCH_TEAM_LIST,
    params,
  });
}
