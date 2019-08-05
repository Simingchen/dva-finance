<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in Array.from(visitedViews)"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="tag"
        :key="tag.path"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新标签页</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭标签页</li>
      <li @click="closeOthersTags">关闭其它标签页</li>
      <li @click="closeRightTags">关闭右侧标签页</li>
      <li @click="closeAllTags">关闭所有标签页</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/scrollPane'
export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      closeRight: ''
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created () {
    const that = this
    window.addEventListener('beforeunload', () => {
      const value = that.$store.state.tagsView.visitedViews
      const routArry = []
      for (let i = 0; i < value.length; i++) {
        const obj = { name: value[i].name, meta: value[i].meta, path: value[i].path }
        routArry.push(obj)
      }
      window.sessionStorage.asd = JSON.stringify(routArry)
    })
    if (sessionStorage.asd !== undefined) {
      const routers = JSON.parse(sessionStorage.asd)
      for (let j = 0; j < routers.length; j++) {
        if (routers[j].meta.affix) {
          that.$store.dispatch('addView', routers[j])
        }
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addView', route)
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        if (tags !== undefined) {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        }
      })
    },
    refreshSelectedTag (view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    // 关闭右侧标签页
    closeRightTags () {
      const visitedViews = this.$store.getters.visitedViews
      const arry = []
      for (let i = 0; i < visitedViews.length; i++) {
        if (visitedViews[i].title !== this.closeRight) {
          arry.push(visitedViews[i])
          if (visitedViews[i].title === this.closeRight) {
            arry.push(visitedViews[i])
            break
          }
        } else {
          arry.push(visitedViews[i])
          break
        }
      }
      this.$store.dispatch('visitedViews', arry)
      this.$router.push(arry[arry.length - 1].path)
    },
    // 关闭其他标签页
    closeOthersTags () {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu (tag, e) {
      this.closeRight = tag.title
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      this.left = e.clientX - offsetLeft - 25 // 15: margin right
      this.top = e.clientY - 45
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 31px;
  width: 100%;
  background: #EAEDF1;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 31px;
      line-height: 36px;
      color: #A8A8A8;
      background: #F5F6F7;
      padding: 0 8px;
      font-size: 12px;
      margin-right: 1px;
      // margin-top: 4px;
      &:first-of-type {
        // margin-left: 15px;
      }
      &:last-of-type {
        // margin-right: 15px;
      }
      &.active {
        background-color:#fff;
        color: #338EF3;
        font-weight: 700;
        border-color: #3478d9;
        box-shadow: 1px -3px 2px  rgba(0, 0, 0, .12);
        &::before {
          // content: '';
          background: red;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: linear-gradient(to top left, #70B6FF, #409EFF);
        // background: #409EFF;
        color: #fff;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 12px;
      height: 12px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
