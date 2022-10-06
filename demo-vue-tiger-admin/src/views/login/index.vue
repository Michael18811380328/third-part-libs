<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import Footer from '@/components/Footer/index.vue'
import useLoading from '@/hooks/loading'
import { useUserStore } from '@/store'
import { HomePath } from '@/config/constants'

const { loading, setLoading } = useLoading()
const router = useRouter()
const errorMessage = ref('')
const userStore = useUserStore()
const formRef = ref<any>(null)

const formData = reactive({
  username: 'admin',
  password: '123456',
  imgCode: 'v9am',
})

const refreshCode = () => {
  // getCodeImg()
}

const handleSubmit = () => {
  const form = unref(formRef)
  form
    .validate(async (valid: any) => {
      if (valid) return
      await userStore.login(formData)
      const { redirect, ...othersQuery } = router.currentRoute.value.query
      router.push({
        path: (redirect as string) || HomePath,
        query: {
          ...othersQuery,
        },
      })
      setTimeout(() => {
        Message.success('Hi，欢迎回来')
      }, 500)
    })
    .catch((error: any) => {
      console.log('error', error)
    })
    .finally(() => {
      setLoading(false)
    })
}
</script>

<template>
  <div class="app-login-top">
    <div class="header">
      <img src="@/assets/logo.svg" alt="tiger" class="logo" />
      <span class="title">Vue3-Tiger-Admin</span>
    </div>
    <div class="desc">一个普通的 Vue3 开发模板</div>
  </div>
  <div class="app-login">
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form ref="formRef" :model="formData" class="app-login-form" layout="vertical">
      <a-form-item field="username" :rules="[{ required: true, message: '请输入用户名' }]" :validate-trigger="['change', 'blur']" hide-label>
        <a-input ref="userNameInput" v-model="formData.username" size="large" placeholder="用户名: admin">
          <template #prefix><icon-user /></template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :rules="[{ required: true, message: '请输入密码' }]" :validate-trigger="['change', 'blur']" hide-label>
        <a-input-password v-model="formData.password" size="large" placeholder="密码: 123456" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="imgCode">
        <a-input v-model="formData.imgCode" class="login-code-input" size="large" />
        <img class="app-code-img" src="@/assets/login-code.png" alt="" @click="refreshCode" />
      </a-form-item>
      <a-space :size="16" direction="vertical" style="margin-top: 20px">
        <a-button type="primary" html-type="submit" @click="handleSubmit" long :loading="loading">确定 </a-button>
      </a-space>
    </a-form>
  </div>
  <div class="app-login-footer" style="display: none111">
    <Footer />
  </div>
</template>

<style lang="scss">
body {
  background: url('@/assets/login.svg') #f0f2f5;
  background-size: 100%;
}
.app-login-top {
  text-align: center;
  margin-top: 130px;
  .header {
    height: 44px;
    line-height: 44px;
    .logo {
      width: 44px;
      height: 44px;
      margin-right: 16px;
      vertical-align: middle;
    }
    .title {
      position: relative;
      top: 2px;
      color: #444;
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    }
  }
  .desc {
    margin-top: 12px;
    margin-bottom: 40px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
.app-code-img {
  height: 32px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.login-code-input {
  width: 90%;
  margin-right: 15px;
  vertical-align: middle;
}
.app-login {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-login-form {
    position: absolute;
    top: 40%;
    left: 50%;
    box-shadow: 0 0 10px 1px #e1e1e1;
    transform: translate(-50%, -50%);
    padding: 30px 30px 35px;
    width: 300px;
    background: #fff;
    border-radius: 5px;
    .ant-row {
      display: block;
    }
    h1 {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.85);
      text-align: center;
      font-weight: 700;
    }
  }
}
.app-login-footer {
  position: fixed;
  bottom: 45px;
  text-align: center;
  width: 100%;
}
</style>
