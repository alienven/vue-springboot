<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana">
        <DepMana/>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana">
        <PosMana/>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana">
        <JobLevelMana/>
      </el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana">
        <EcMana/>
      </el-tab-pane>
      <el-tab-pane label="权限组" name="PositionMana">
        <PositionMana/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DepMana from "@/components/sys/basic/DepMana";
import PosMana from "@/components/sys/basic/PosMana";
import JobLevelMana from "@/components/sys/basic/JobLevelMana";
import EcMana from "@/components/sys/basic/EcMana";
import PositionMana from "@/components/sys/basic/PositionMana";

export default {
  name: "SysBasic",
  components: {
    DepMana,
    PosMana,
    JobLevelMana,
    EcMana,
    PositionMana
  },
  data() {
    return {
      activeName: 'DepMana'
    }
  }
}
</script>

<style scoped>

</style>
