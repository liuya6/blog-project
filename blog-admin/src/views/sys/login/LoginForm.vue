<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
        autocomplete="off"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
        autocomplete="off"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <!--        <FormItem>-->
        <!--          &lt;!&ndash; No logic, you need to deal with it yourself &ndash;&gt;-->
        <!--          <Checkbox v-model:checked="rememberMe" size="small">-->
        <!--            {{ t('sys.login.rememberMe') }}-->
        <!--          </Checkbox>-->
        <!--        </FormItem>-->
        <!--        <FormItem name="captcha" class="enter-x">-->
        <!--          <Input-->
        <!--            class="captchaInput"-->
        <!--            style="width: 100%"-->
        <!--            size="large"-->
        <!--            v-model:value="formData.captcha"-->
        <!--            :placeholder="t('sys.login.captcha')"-->
        <!--            autocomplete="off"-->
        <!--          />-->
        <!--        </FormItem>-->
      </ACol>
      <!--      <ACol :span="12">-->
      <!--        <img class="captcha" :src="cap" @click="refreshCap" />-->
      <!--      </ACol>-->
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!--      <Button size="large" class="mt-4 enter-x" block @click="handleRegister">-->
      <!--        {{ t('sys.login.registerButton') }}-->
      <!--      </Button>-->
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Form, Input, Row, Col, Button } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;

  const { t } = useI18n();
  const { notification } = useMessage();
  const userStore = useUserStore();

  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  // const cap = ref(getCap() || '');
  // const rememberMe = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    // captcha: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  // function getCap() {
  //   return `/api/admin/captcha?_t=${Date.now()}`;
  // }

  // function refreshCap() {
  //   cap.value = getCap();
  // }

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        account: data.account,
        // captcha: data.captcha,
        mode: 'modal', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}：${userInfo}`,
          duration: 3,
        });
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<style lang="less" scoped>
  .captcha {
    height: 40px;
    width: 100%;
    padding-left: 10px;
    cursor: pointer;
  }
</style>
