import * as process from 'process';

export default class GrafanaUrlBuilder {
  static buildWithQuery(query: string): string {
    return process.env.SEDUCE_GRAFANA_BASE_URL + '&q=' + query;
  }

  static consumptionDiffNode(
    nodeID: string,
    from: number,
    step: number,
  ): string {
    const query = `SELECT mean("value") FROM "sensors" WHERE ("sensor" = '${nodeID}') AND time >= now() - ${from}h GROUP BY time(1${step}ms) fill(null);`;
    return this.buildWithQuery(encodeURIComponent(query));
  }

  static liveConsumption(nodes: string[]): string {
    const nodesQuery = nodes
      .map(
        (node) =>
          `SELECT mean("value") FROM "sensors" WHERE ("sensor" = '${node}') AND time >= now() - 5s fill(null);`,
      )
      .join('');
    return this.buildWithQuery(encodeURIComponent(nodesQuery));
  }

  static _productionSolarPanels(from: number,unit :string): string {
  return `SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar1_sol1_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar2_sol2_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar3_sol3_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar4_sol4_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar5_sol5_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar6_sol6_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar7_sol7_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar8_sol8_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar9_sol9_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar10_sol10_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar11_sol11_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar12_sol12_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar13_sol13_P_AC') AND time >= now() - ${from}${unit} fill(null);SELECT mean("value") FROM "sensors" WHERE ("sensor" = 'solar14_sol14_P_AC') AND time >= now() - ${from}${unit} fill(null)`;
}

  static productionSolarPanels(from: number): string {
    const query = GrafanaUrlBuilder._productionSolarPanels(from,'h')
    console.log(query)
    return this.buildWithQuery(encodeURIComponent(query));
  }


  static liveProductionSolarPanels(): string {
    const query = GrafanaUrlBuilder._productionSolarPanels(4,'m')
    return this.buildWithQuery(encodeURIComponent(query));
  }

  static consumptionNode(
    nodeID: string,
    ranges: Array<Array<number>>,
    step: number,
  ): string {
    let query = '';
    for (let i = 0; i < ranges.length; i++) {
      query += `SELECT mean("value") FROM "sensors" WHERE ("sensor" = '${nodeID}') AND time >= ${ranges[i][0]}ms AND time <= ${ranges[i][1]}ms GROUP BY time(${step}ms) fill(null);`;
    }

    return this.buildWithQuery(encodeURIComponent(query));
  }
}
