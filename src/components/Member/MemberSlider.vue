<template>
  <div class="Wrapper">
    <PostPopup></PostPopup>

    <div v-on:click="pre" v-bind:class="{hidden : this.$store.state.nowDisplayMemberIndex == 1}">
      <i class="fas fa-chevron-circle-left fa-2x left"></i>
    </div>
    <div
      class="memberContainer"
      v-bind:style="{'transform': 'translate(-' + (this.$store.state.nowDisplayMemberIndex)*imgWidth + 'vw, 0px)'}"
    >
      <div class="memberInfo" v-for="member in members">
        <!-- <div class="image" v-bind:style="{ 'background-image': 'url(' + i + ')' }"></div> -->

        <div class="infoHeader">
          <!-- 좌상단 프로필사진 -->
          <div class="profileImgContanier">
            <div
              class="profileImg"
              v-bind:style="{ 'background-image': `url(${member.image_src})` }"
            ></div>
          </div>
          <!-- 우상단 설명부분 -->
          <div class="introContainer">
            <span class="name">{{member.name}}</span>
            <div class="intro">{{member.intro}}</div>
            <ul class="socialList">
              <li class="socialItem" v-for="social in member.socials">
                <a target="_blank" v-bind:href="social.url">{{social.title}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="infoContent">
          <!-- more 버튼 -->
          <div
            class="page__container"
            @click="togglePopUp"
            v-bind:class="{modalShow : ismodalShow}"
            style="cursor:pointer"
          >More</div>
          <!-- 스킬바 -->
          <SkillSlider v-bind:skills="member.skills"></SkillSlider>
        </div>
      </div>
    </div>
    <div
      v-on:click="next"
      v-bind:class="{hidden : this.$store.state.nowDisplayMemberIndex == length-2}"
    >
      <i class="fas fa-chevron-circle-right fa-2x right"></i>
    </div>
  </div>
</template>

<script>
import SkillSlider from "./SkillSlider";
import PostPopup from "./Posts/PostPopup";
import $ from "jquery";
import { setInterval } from "timers";

export default {
  components: {
    SkillSlider,
    PostPopup
  },
  props: ["members"],
  data() {
    return {
      length: this.members.length,
      // selected: 1,
      imgWidth: 88.3,
      ismodalShow: this.$store.state.isPostShow,
      member: ["", "이주호", "유동관", "임연지", "한단비", "한만섭"]
    };
  },
  mounted() {
    // console.log(
    //   "현재 보여지는 멤버 인덱스 : ",
    //   this.$store.state.nowDisplayMemberIndex
    // );
    // console.log(
    //   "현재 보여지는 멤버 이름 : ",
    //   this.$store.state.nowDisplayMember
    // );
  },
  methods: {
    next() {
      if (this.$store.state.nowDisplayMemberIndex < this.length) {
        // console.log(this.$store.state.nowDisplayMemberIndex);
        // console.log(this.selected);
        // this.selected = this.selected + 1;
        this.$store.commit(
          "setNowDisplayMemberIndex",
          this.$store.state.nowDisplayMemberIndex + 1
        );
        // this.$store.commit(
        //   "setNowDisplayMember",
        //   this.member[this.$store.state.nowDisplayMemberIndex]
        // );
      }
    },
    pre() {
      if (this.$store.state.nowDisplayMemberIndex > 1) {
        // console.log(this.$store.state.nowDisplayMemberIndex);
        // this.selected = this.selected - 1;
        this.$store.commit(
          "setNowDisplayMemberIndex",
          this.$store.state.nowDisplayMemberIndex - 1
        );
        // this.$store.commit(
        //   "setNowDisplayMember",
        //   this.member[this.$store.state.nowDisplayMemberIndex]
        // );
      }
    },
    togglePopUp() {
      // this.ismodalShow = !this.ismodalShow;
      this.$store.commit(
        "setNowDisplayMember",
        this.member[this.$store.state.nowDisplayMemberIndex]
      );
      this.$store.commit("toggleIsPostShow");
    }
  }
};
</script>

<style>
.Wrapper {
  user-select: none;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  /* overflow: hidden; */
}
.memberContainer {
  padding-top: 50px;
  height: 100%;
  width: 100%;
  display: flex;
  transition: 0.6s;
}
.infoHeader {
  /* background-color: gray; */
  display: grid;
  grid-template-columns: 3fr 7fr;
}
.infoContent {
  position: relative;
  background-color: #f6f6f6;
}
.introContainer {
  align-self: center;
  padding: 0 20px;
  margin: 50px 0;
  border-left: 3px solid orange;
}
.introContainer .name {
  font-size: 25px;
}
.introContainer .intro {
  margin-top: 8px;
  font-weight: 100;
}
.profileImgContanier {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.profileImg {
  border-radius: 50%;
  align-self: center;
  justify-self: center;
  width: 50%;
  height: 85%;
  background-position: center;
  background-size: cover;
}
.socialList {
  margin-top: 20px;
  list-style: none;
  display: flex;
}

.socialItem {
  margin-right: 20px;
}
.socialItem a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
}

.page__container {
  border: 1px solid rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 45%;
  background-color: #f6f6f6;
  top: -23px;
  font-size: 30px;
  padding: 0 10px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 3;
}
.page__container a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
}

.post-column {
  height: 578px;
}

.memberInfo {
  height: 80%;
  width: 82vw;
  /* background-color: yellowgreen; */
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 0 3vw;

  display: grid;
  grid-template-rows: 4fr 6fr;
}
.memberInfo:first-child {
  /* margin-left: calc(6vw+41px); */
  margin-left: 9vw;
}

.left {
  position: absolute;
  left: 9vw;
  top: 43.5%;
  cursor: pointer;
}

.right {
  position: absolute;
  right: 8.5vw;
  top: 43.5%;
  cursor: pointer;
}
svg {
  z-index: 2;
  color: rgba(0, 0, 0, 0.2);
}
.hidden {
  display: none;
}

@media (max-width: 1024px) {
  .memberInfo {
    grid-template-rows: 6fr 4fr;
  }
  .profileImg {
    border-radius: 50%;
    align-self: center;
    justify-self: center;
    width: 80%;
    height: 50%;
    background-position: center;
    background-size: cover;
  }
}

@media (max-width: 768px) {
  .memberInfo {
    grid-template-rows: 7fr 3fr;
  }
  .right,
  .left {
    top: 48%;
  }
  .page__container {
    left: 38%;
    font-size: 23px;
    top: -20px;
  }
  .infoHeader {
    grid-template-rows: 6fr 4fr;
    grid-template-columns: none;
  }
  .introContainer {
    margin: 0;
    margin-left: 10px;
    padding-bottom: 5px;
  }
  .introContainer .name {
    font-size: 18px;
  }
  .introContainer .intro {
    margin-top: 5px;
    font-size: 14px;
  }
  .socialList {
    font-size: 14px;
    margin-top: 5px;
  }
  .profileImg {
    border-radius: 50%;
    align-self: center;
    justify-self: center;
    width: 50%;
    height: 85%;
    background-position: center;
    background-size: cover;
  }
}
</style>
