'use strict'

const container = require('@google-cloud/container')

const projectId = process.env.GOOGLE_PROJECT_ID
const region = process.env.GOOGLE_COMPUTE_REGION
const cluster = process.env.GOOGLE_CLUSTER_NAME

const client = new container.v1.ClusterManagerClient()
const clusterSpec = {
  clusterId: cluster,
  projectId: projectId,
  zone: region
}
console.log('acting on', clusterSpec)

async function setDesiredMasterAuthorizedNetworksConfig(config) {
  return client.updateCluster({
    ...clusterSpec,
    update: {
      desiredMasterAuthorizedNetworksConfig: config
    }
  })
}

async function getConfig() {
  return await client.getCluster(clusterSpec)
}

module.exports = {
  getConfig,
  setDesiredMasterAuthorizedNetworksConfig
}
