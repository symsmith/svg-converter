<script lang="ts">
  export let value: string;
  export let name: string;
  export let placeholder: string;
  export let readonly = false;
  export let copyable = false;

  function copy(e: MouseEvent) {
    if (!copyable) return;

    const target = e.target as HTMLTextAreaElement;

    if (navigator?.clipboard && target.value.length > 0) {
      navigator.clipboard.writeText(target.value);
      target.classList.add("copied");

      setTimeout(() => {
        target.classList.remove("copied");
      }, 300);
    }
  }
</script>

<textarea
  {name}
  id={name}
  {placeholder}
  {readonly}
  bind:value
  on:input
  on:click={copy}
  class="resize-none 
         border
         block
         rounded-lg
         w-full
       border-gray-500
         shadow-inner
         focus:ring
         focus:outline-none
         px-2
         py-1
         {copyable && 'cursor-pointer copiable'}"
/>

<style>
  textarea {
    height: 45vh;
  }

  @media (min-width: 768px) {
    textarea {
      height: 90vh;
    }
  }

  .copied {
    animation: copied 0.3s ease-in-out;
  }

  @keyframes copied {
    from {
      transform: scaleX(1);
    }
    50% {
      transform: scale(1.03);
    }
    to {
      transform: scaleX(1);
    }
  }
</style>
