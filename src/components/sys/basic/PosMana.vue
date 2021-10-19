<template>
  <div>
    <div>
      <el-input
        class="addPosInput"
        size="small"
        placeholder="添加职位"
        prefix-icon="el-icon-plus"
        v-model="pos.name"
        @keyup.enter.native="addPosition"
      >
      </el-input>
      <el-button
        icon="el-icon-plus"
        type="primary"
        size="small"
        circle
        @click="addPosition"
      >
      </el-button>
    </div>
    <div class="posManaMain">
      <el-table
        :data="positions"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'id', order: 'ascending' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" sortable width="80">
        </el-table-column>
        <el-table-column prop="name" label="职位" width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="90">
          <!--            :filters="[{ text: '启用', value: 'true' }, { text: '禁用', value: 'false' }]"-->
          <!--            :filter-method="filterEnabled"-->
          <!--            filter-placement="bottom-end"-->
          <!--          <template slot-scope="scope">-->
          <!--            <el-tag-->
          <!--                :type="scope.row.enabled === true ? 'success' : 'error'"-->
          <!--                disable-transitions>-->
          <!--              {{ scope.row.enabled ? '启用' : '禁用' }}-->
          <!--            </el-tag>-->
          <!--          </template>-->
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button
      size="small"
      style="margin-top: 8px"
      type="danger"
      :disabled="this.multipleSelection.length === 0"
      @click="deleteMany"
      >批量删除
    </el-button>
    <el-dialog title="编辑职位" :visible.sync="dialogVisible" width="30%">
      <table>
        <tr>
          <td>
            <el-tag>职位名称</el-tag>
          </td>
          <td>
            <el-input
              v-model="updatePos.name"
              size="small"
              class="updatePosInput"
            ></el-input>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag>是否启用</el-tag>
          </td>
          <td>
            <el-switch
              style="margin-left: 6px"
              v-model="updatePos.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="未启用"
            >
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        // 添加职位数据
        name: "",
      },
      updatePos: {
        // 更新职位数据
        name: "",
        enabled: false,
      },
      positions: [], //职位数据表
      multipleSelection: [], // 批量删除勾选的对象
      dialogVisible: false, // 是否弹出编辑框
    };
  },
  methods: {
    // 获取后端接口所有职位数据
    initPositions() {
      this.getRequest("/system/basic/pos/").then((resp) => {
        if (resp) {
          this.positions = resp;
        }
      });
    },
    // 添加职位
    addPosition() {
      if (this.pos.name) {
        this.postRequest("/system/basic/pos/", this.pos).then((resp) => {
          if (resp) {
            this.initPositions();
            this.pos.name = "";
          }
        });
      } else {
        this.$message.error("职位不能为空！");
      }
    },
    // 编辑职位对话框
    handleEdit(data) {
      Object.assign(this.updatePos, data); // 回显数据,数据拷贝
      this.updatePos.createDate = "";
      this.dialogVisible = true;
    },
    // 编辑职位
    doUpdate() {
      this.putRequest("/system/basic/pos/", this.updatePos).then((resp) => {
        if (resp) {
          this.initPositions();
          this.dialogVisible = false;
        }
      });
    },
    // 删除职位
    handleDelete(data) {
      this.$confirm(
        "此操作将永久删除 " + data.name + " 职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.deleteRequest(" /system/basic/pos/" + data.id).then((resp) => {
            if (resp) {
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 批量删除(取值）
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除请求
    deleteMany() {
      this.$confirm(
        "此操作将永久删除 " +
          this.multipleSelection.length +
          " 条职位, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids = "?";
          this.multipleSelection.forEach((item) => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("/system/basic/pos/" + ids).then((resp) => {
            if (resp) {
              this.initPositions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //数据是否显示
    // filterEnabled(value, row) {
    //   const isEn = row.enabled + ''
    //   return isEn === value;
    // }
  },
  mounted() {
    // 调用获取后端接口所有职位数据方法
    this.initPositions();
  },
};
</script>

<style scoped>
/*添加职位输入框*/
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

/*所有数据表格*/
.posManaMain {
  margin-top: 10px;
}

/*编号职位输入框*/
.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
</style>
