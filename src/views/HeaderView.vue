<template>
  <nav class="container-fluid">
    <ul>
      <li>Another APOD viewer</li>
    </ul>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/search">Search</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="https://github.com/tcastanie/another-apod-viewer"
          target="_blank"
          rel="noopener noreferrer"
          class="secondary"
        >
          <svg>
            <path
              d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.8 9.5c.5 0 .7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.4-1.2-1-1.5-1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1-4.6-4.9 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c2-1.2 2.8-1 2.8-1 .5 1.4.1 2.4 0 2.7.7.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 5 .4.2.7.8.7 1.8V21c0 .3.2.6.7.5 4-1.3 6.8-5 6.8-9.5A10 10 0 0 0 12 2Z"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  z-index: 9;
  bottom: 0;
  width: 100%;
  background-color: var(--header-background-color);
}

svg {
  width: 24px;
  height: 24px;
}
</style>
