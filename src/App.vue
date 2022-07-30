<template>
  <nav>
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
  </nav>

  <RouterView />
</template>

<script>
export default {};
</script>
