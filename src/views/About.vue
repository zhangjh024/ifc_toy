<template>
  <div class="about">
    <p>A site for events to better the world.</p>
    <div id="model"></div>
<!--    <input id = "file-input"/>-->
  </div>
</template>
<script>
import { IfcViewerAPI } from 'web-ifc-viewer'
import {
  IFCSPACE, IFCOPENINGELEMENT
} from 'web-ifc';
import { Color } from 'three'

export default {
  async mounted() {

    const container = document.getElementById("model")
    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new Color(0xffffff),
    });
    viewer.axes.setAxes();
    viewer.grid.setGrid();

    // const input = document.getElementById("file-input");

    window.ondblclick = () => viewer.IFC.selector.pickIfcItem(true);
    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
    viewer.clipper.active = true;

    window.onkeydown = (event) => {
      if (event.code === "KeyP") {
        viewer.clipper.createPlane();
      } else if (event.code === "KeyO") {
        viewer.clipper.deletePlane();
      }
    };



    await viewer.IFC.setWasmPath('../IFCjs/')
    await viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
      [IFCSPACE]: false,
      [IFCOPENINGELEMENT]: false
    })


    // 提示：加载 ifc 文件，文件路径为 '../models/SampleHouse.ifc'
    async function loadIfc(url) {
      const model = await viewer.IFC.loadIfcUrl(url);
      viewer.shadowDropper.renderShadow(model.modelID);
    }

    loadIfc("../models/SampleHouse.ifc");

  }
}
</script>

<style scoped>
#model {
  width: 600px;
  height: 600px;
  margin: 0 auto;
}
</style>
