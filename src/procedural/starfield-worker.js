import StarField from './starfield'

self.onmessage = messageEvent => {
    const sectorsToPopulate = messageEvent.data.sectorsToPopulate
    const sectorSize = messageEvent.data.sectorSize
    const starfieldsVertices = {}

    for (let sectorToPopulate of sectorsToPopulate) {
        const brightStarsRandomVertices = _getVerticesInRandomPosition(sectorToPopulate, sectorSize)
        const normalStarsRandomVertices = _getVerticesInRandomPosition(sectorToPopulate, sectorSize)
        const paleStarsRandomVertices = _getVerticesInRandomPosition(sectorToPopulate, sectorSize)

        starfieldsVertices[sectorToPopulate] = {
            brightStarsRandomVertices,
            normalStarsRandomVertices,
            paleStarsRandomVertices
        }
    }

    self.postMessage(starfieldsVertices)
}


function _getVerticesInRandomPosition(currentSector, sectorSize) {
    const vertices = []
        // @todo make it dynamic from the main thread
    const max = 20000


    for (let i = 0; i < max; i++) {
        // creating coordinate for the particles in random positions but confined in the current square sector
        let x = sectorSize * Math.random() - (sectorSize / 2)
        let y = sectorSize * Math.random() - (sectorSize / 2)
        let z = sectorSize * Math.random() - (sectorSize / 2)

        // we dont need to tweak coordinates on the origin sector
        if (currentSector != '0,0,0') {
            const arrayCurrentSector = currentSector.split(',')

            // handling x axis (right and left) sectors population
            if (arrayCurrentSector[0] != 0)
                x = (x + (sectorSize * arrayCurrentSector[0]))

            // since we're not handling vertical movement at the moment
            // we dont need to handle the y axis

            // handling z axis (forward and backward) sectors population
            if (arrayCurrentSector[2] != 0)
                z = (z + (sectorSize * arrayCurrentSector[2]))
        }

        vertices.push(x, y, z)
    }

    return vertices
}