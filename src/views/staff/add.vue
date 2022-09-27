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
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="手机号" prop="cell">
          <el-input v-model="ruleForm.cell" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择部门">
            <el-option label="研发部" />
            <el-option label="综合支持部" />
            <el-option label="品牌运营部" />
            <el-option label="电商" />
            <el-option label="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" />
        </el-form-item>
        <el-form-item label="角色权限" prop="role_id">
          <el-radio-group v-model="ruleForm.role_id">
            <el-radio label="1">管理员</el-radio>
            <el-radio label="2">部门经理</el-radio>
            <el-radio label="3">社群及运营</el-radio>
            <el-radio label="4">线下场地免费</el-radio>
            <el-radio label="5">人事行政</el-radio>
            <el-radio label="6">供应链管理</el-radio>
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
import { getWXUserList, postStaffInfo } from '@/api/staff'
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
        role_id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { trigger: 'blur' }
        ],
        cell: [
          { min: 11, max: 11, message: '请输入正确的手机号', required: true, trigger: 'change' }
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
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.ruleForm.role_id = Number(this.ruleForm.role_id)
          await postStaffInfo(this.ruleForm, getToken())
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
