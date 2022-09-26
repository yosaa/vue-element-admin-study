<template>
  <div class="box">
    <div>
      <span class="el-form-item__label" style="width: 100px;">搜索微信昵称    </span>
      <el-select
        v-model="nickname"
        placeholder="请选择"
        clearable
        filterable
        :filter-method="findWXUser"
        @change="getUid(nickname)"
      >
        <div v-for="(item, index) in userList" :key="index" style="display: flex;flex-direction: row;justify-content:flex-start ;">
          <img :src="item.headimgurl" style="width:35px">
          <el-option
            :label="item.nickname"
            :value="item.nickname"
          />
        </div>
      </el-select>
    </div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.uid" />
        </el-form-item>
        <el-form-item label="手机号" prop="cell">
          <el-input v-model="ruleForm.cell" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择部门">
            <el-option label="研发部" value="shanghai" />
            <el-option label="综合支持部" value="beijing" />
            <el-option label="品牌运营部" value="beijing" />
            <el-option label="电商" value="beijing" />
            <el-option label="其他" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" />
        </el-form-item>
        <el-form-item label="角色权限" prop="role_id">
          <el-radio-group v-model="ruleForm.role_id">
            <el-radio label="管理员" value="1" />
            <el-radio label="部门经理" value="2" />
            <el-radio label="社群及运营" value="3" />
            <el-radio label="线下场地免费" value="4" />
            <el-radio label="人事行政" value="5" />
            <el-radio label="供应链管理" value="6" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getWXUserList } from '@/api/staff'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      nickname: '',
      userList: [],
      ruleForm: {
        uid: 'xxx',
        username: '',
        cell: '',
        department: '',
        position: '',
        role_id: false,
        type: [],
        resource: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },

  created() {},
  mounted() {},

  methods: {
    async findWXUser(nickname) {
      if (nickname) {
        const { data } = await getWXUserList(nickname, getToken())
        this.userList = data
      }
    },
    getUid(nickname) {
      this.userList.map(i => {
        if (i.nickname === nickname) this.ruleForm.uid = i.uid
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<style lang=scss>
  .box {
    display: flex;
    flex-direction: row;
    justify-content:flex-start ;
}
</style>
