<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <!--        <img v-if="logo" :src="logo" class="sidebar-logo">-->
        <!--        sdfsdf-->
        <div class="sidebar-logo">D<span style="color:red;">.</span></div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!--        <img v-if="logo" :src="logo" class="sidebar-logo">-->
        <div class="sidebar-title">
          <div class="">
            <span style="font-size: 22px">Dumplings</span><span style="color: red">.</span>
          </div>
          <div class="">
            <span>后台管理系统</span>
          </div>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Dumplings后台管理系统',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 80px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;


  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {

     display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: white;
      height: 100%;
    }

    & .sidebar-title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100%;
      margin: 0;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
