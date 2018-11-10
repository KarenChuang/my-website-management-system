<template>
  <div id="app">
    <!-- menu -->
    <div class="layout-menu">
      <div class="layout-menu__logo">
        Karen Zhong<img src="~@/assets/plane.svg" alt="plane">
      </div>
      <el-menu default-active="2"
        class="el-menu-vertical"
        background-color="#3D3B3B" text-color="#fff"
        active-text-color="#FEC93D" unique-opened router>
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/techo-list">
          <i class="material-icons">book</i>
          <span slot="title">手账</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- container -->
    <div class="layout-container">
      <div class="layout-container__header">
        <div class="layout-header__info">
          <div class="logout">
            <i class="material-icons">exit_to_app</i>登出</div>
        </div>
      </div>
      <div class="layout-container__content">
        <transition name="slide-fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import './styles/reset.scss';
@import './styles/common.scss';

#app {
  display: flex;
  flex: 1 1 auto;
  height: 100vh;
  min-width: 1100px;
  background: #eef0f4;
  overflow-y: auto;
}
.layout-menu {
  flex-shrink: 0;
  min-height: 100vh;
  position: relative;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu-vertical i {
    margin-right: 10px;
  }
  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E07A76;
    color: #fff;
    height: 50px;
    img {
      width: 35px;
    }
  }
}

.layout-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100vh;
  overflow-x: hidden;

  // header
  &__header {
    width: 100%;
    height: 50px;
    position: relative;
    box-shadow: rgba(11, 23, 35, 0.36) 0px 1px 4px;
    padding: 0px 30px 0px 0px;
    background: #E07A76;
    display: flex;
    justify-content: space-between;
    flex: none;
    .layout-header__info {
      display: flex;
      align-items: center;
      line-height: 64px;
      .logout {
        cursor: pointer;
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 14px;
        transition: 0.3s;
        &:hover {
          right: 30px;
        }
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.15s ease;
}
.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
