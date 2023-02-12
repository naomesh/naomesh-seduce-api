import * as process from "process";

export default class GrafanaUrlBuilder {

  static buildWithQuery(query: string): string {
    return process.env.SEDUCE_GRAFANA_BASE_URL + "&q=" + query;
  }

  static liveConsumption(nodes: string[]): string {
    let nodesQuery = nodes
      .map((node) => `SELECT mean("value") FROM "sensors" WHERE ("sensor" = '${node}') AND time >= now() - 5s fill(null);`)
      .join("")
    return this.buildWithQuery(encodeURIComponent(nodesQuery));
  }
}
