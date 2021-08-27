import * as THREE from 'three'

self.onmessage = messageEvent => {
  const clustersToPopulate = messageEvent.data.clustersToPopulate
  const currentUniverse = messageEvent.data.currentUniverse
  const starfieldParameters = messageEvent.data.parameters.matters[currentUniverse].starfield
  const clusterSize = messageEvent.data.parameters.grid.clusterSize
  const starfieldsAttributes = {}

  for (const clusterToPopulate of clustersToPopulate) {
    // first impressions are crucial
    const verticesPassmin = clusterToPopulate === '0,0,0' ? starfieldParameters.vertices.pass.max * 1.5 : starfieldParameters.vertices.pass.min
    const verticesPassmax = clusterToPopulate === '0,0,0' ? starfieldParameters.vertices.pass.max * 1.5 : starfieldParameters.vertices.pass.max

    const brightStarsRandomAttributes = _getAttributesInRandomPosition(
      Math.floor(
        starfieldParameters.budget * THREE.MathUtils.randFloat(
          starfieldParameters.vertices.bright.min,
          starfieldParameters.vertices.bright.max
        )
      ),
      clusterSize,
      starfieldParameters,
      currentUniverse
    )

    const firstPassStarsRandomAttributes = _getAttributesInRandomPosition(
      Math.floor(
        starfieldParameters.budget * THREE.MathUtils.randFloat(
          verticesPassmin,
          verticesPassmax
        )
      ),
      clusterSize,
      starfieldParameters,
      currentUniverse
    )

    const secondPassStarsRandomAttributes = _getAttributesInRandomPosition(
      Math.floor(
        starfieldParameters.budget * THREE.MathUtils.randFloat(
          verticesPassmin,
          verticesPassmax
        )
      ),
      clusterSize,
      starfieldParameters,
      currentUniverse
    )

    const thirdPassStarsRandomAttributes = _getAttributesInRandomPosition(
      Math.floor(
        starfieldParameters.budget * THREE.MathUtils.randFloat(
          verticesPassmin,
          verticesPassmax
        )
      ),
      clusterSize,
      starfieldParameters,
      currentUniverse
    )

    starfieldsAttributes[clusterToPopulate] = {
      brightStarsRandomAttributes,
      firstPassStarsRandomAttributes,
      secondPassStarsRandomAttributes,
      thirdPassStarsRandomAttributes
    }
  }

  self.postMessage(starfieldsAttributes)
}

function _getAttributesInRandomPosition (max, clusterSize, parameters, currentUniverse = 0) {
  const positions = []
  const colors = []

  for (let i = 0; i < max; i++) {
    // creating coordinate for the particles in random positions but confined in the current square cluster
    const x = clusterSize * Math.random() - (clusterSize / 2) + THREE.MathUtils.randFloat(0, Math.floor(clusterSize / 5))
    const y = clusterSize * Math.random() - (clusterSize / 2) + THREE.MathUtils.randFloat(0, Math.floor(clusterSize / 5))
    const z = clusterSize * Math.random() - (clusterSize / 2) + THREE.MathUtils.randFloat(0, Math.floor(clusterSize / 5))

    positions.push(x, y, z)
    const color = new THREE.Color(
      Math.random() > 0.4 && currentUniverse != 1 ? '#eeefff' : parameters.colors[THREE.MathUtils.randInt(0, parameters.colors.length - 1)]
    )

    colors.push(color.r, color.g, color.b)
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors)
  }
}
