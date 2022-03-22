<template>
  <div>
    <div class="post">
      <!-- <div class="post__image"></div> -->
      <v-img class="post__image" :src="post.media[0]" />
      <div class="post__content">
        <div class="post__inside">
          <h3 class="post__title">{{ post.title }}</h3>
          <p
            class="post__excerpt"
            v-if="post.description"
            v-text="
              isSmall
                ? post.description.slice(0, 35) + '...'
                : $vuetify.breakpoint.name == 'xl'
                ? post.description.slice(0, 110) + '...'
                : $vuetify.breakpoint.name == 'lg'
                ? post.description.slice(0, 70) + '...'
                : $vuetify.breakpoint.name == 'sm'
                ? post.description.slice(0, 50) + '...'
                : $vuetify.breakpoint.name == 'xs'
                ? post.description.slice(0, 35) + '...'
                : post.description.slice(0, 70) + '...'
            "
          ></p>

          <v-btn
            :to="{ name: 'post', params: { id: post.id } }"
            class="hidden-button"
          >
            Подробнее
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    post: {},
    isSmall: {
      type: Boolean,
    },
  },
  data() {
    return {
      currPage: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["posts"]),
  },
};
</script>

<style lang="scss" scoped>
$primary: #042a4f;
$accent: #e65891;
$secondary: #ccc;
$bg-color: #f4f4f4;
$text-color: #2a2a2a;
$line-height: 1.25;

* {
  box-sizing: border-box;
}

body {
  font-family: "Lato", sans-serif;
  line-height: $line-height;
  background-color: $bg-color;
  color: $text-color;
  font-weight: 500;
}

h1 {
  text-align: center;
}

button {
  font-size: 1rem;
  padding: 0.35em 0.75em;
  line-height: 1;
  background-color: transparent;
  border: 0.125rem solid $text-color;
  border-radius: 2rem;
  cursor: pointer;
  transition: 0.1s;
  outline: 0;

  .fa {
    font-size: 0.75em;
    margin-left: 0.5em;
  }

  &.btn--primary {
    border-color: $primary;
    color: $primary;
  }

  &.btn--accent {
    border-color: $accent;
    color: $accent;
  }
}

$excerpt-height: 5rem * $line-height;
// title (fontSize + marginBottom) + excerpt + button (marginTop + 2 * paddingTopBottom + fontSize + borderWidth) + safe-space
$content-height: (1.35rem + 1rem) + $excerpt-height +
  (1rem + 2 * 0.35rem + 1rem) + 0.25rem + 0.1rem;
// title (fontSize + marginBottom) + excerpt (2 lines)
$content-height-collapsed: (1.35rem + 1rem) + (2rem * $line-height);
$content-overlap-collapsed: 3rem;
$content-overlap: ($content-height - $content-height-collapsed) +
  $content-overlap-collapsed;

.hidden-button {
  display: none;
}
.post {
  &__image {
    width: 100%;
    height: 240px;
    position: relative;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    // image
    &:before {
      background-size: cover;
      background-position: center center;
      transform: scale(1);
      filter: blur(0);
      transition: 2s cubic-bezier(0, 0.6, 0.2, 1);
    }

    // overlay
    &:after {
      // background-color: $primary;

      background: linear-gradient(30deg, $primary 0%, $accent 100%);
      background-size: 100% 300%;
      background-position: bottom left;
      opacity: 0.15;
      transition: 2s cubic-bezier(0, 0.6, 0.2, 1);
    }

    &--1:before {
      background-image: url("https://images.unsplash.com/photo-1510951459752-aac634df6e86?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=50bdf8b5068e794a82c849cc7e269ed3");
    }
    &--2:before {
      background-image: url("https://images.unsplash.com/photo-1529392960549-df4af50eac23?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b482040f9d3a25a5e5352948f68f3a0e");
    }
    &--3:before {
      background-image: url("https://images.unsplash.com/photo-1506258998-82810ddc75a3?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=68da264c24bc024a0b2ff92c349e89ed");
    }
    &--4:before {
      background-image: url("https://images.unsplash.com/photo-1520875777965-f99b03dc86e8?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=34ff37a297e7e9e7be972356103b6750");
    }
    &--5:before {
      background-image: url("https://images.unsplash.com/photo-1527664557558-a2b352fcf203?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=d06ac80d600822cb010987a6af4ff02a");
    }
    &--6:before {
      background-image: url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f982b6bf45d8a72d038b60a010e16767");
    }
  }

  &__content {
    margin: -1 * $content-overlap-collapsed 1.5rem 0;
    padding: 1.5rem;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15);
    transition: margin 0.2s ease-in-out;
    position: relative;
    z-index: 1;
    user-select: none;
  }

  &__inside {
    overflow: hidden;
    height: $content-height-collapsed;
    transition: height 0.2s ease-in-out;
  }

  &__title {
    font-size: 1.35rem;
    line-height: 1;
    margin: 0 0 1rem;
    font-weight: 300;
    color: $primary;
  }

  &__excerpt {
    overflow: hidden;
    margin: 0;
    max-height: $excerpt-height;
    position: relative;
  }

  &__button {
    text-decoration: none;
    color: black;
  }
}

/* ====== HOVER ====== */

.post:hover {
  .post {
    &__content {
      margin-top: -1 * $content-overlap;
    }

    &__inside {
      height: $content-height;
      .hidden-button {
        display: flex;
      }
    }

    &__image {
      &:after {
        opacity: 0.5;
      }

      &:before {
        transform: scale(1.1);
        filter: blur(10px);
      }
    }
  }
}
</style>