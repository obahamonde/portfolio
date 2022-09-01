<template>
			<div id="item" class="item" tl fixed m-4>
				<Ico icon="ri:aliens-fill" text-gray-500 text-4xl cp />
			</div>
</template>
<style scoped>
.item {
  border-radius: 50%;
  box-sizing: border-box;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem; 
  transition: 2s;
}
.item:hover {
  transition: 2s;
  background-color: #07fe11;
  box-shadow: 0 0 20px 10px #061468, 0 0 37px 20px #07fe11, 0 0 44px 30px #252525;
  z-index: 500;
}
.item > a > svg {
  color: #fff;
  filter: drop-shadow(0 0 5px #07fe11) drop-shadow(0 0 15px #07fe11);
}

</style>