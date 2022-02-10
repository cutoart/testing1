<template>
  <div id="payment-form" class="sr-payment-form">
    <div class="sr-combo-inputs-row">
      <div class="sr-input sr-card-element" id="card-element"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sr-combo-inputs-row {
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
}
/* Inputs */
.sr-input,
input[type="text"] {
  border: 1px solid var(--gray-border);
  border-radius: var(--radius);
  padding: 5px 12px;
  height: 44px;
  width: 100%;
  transition: box-shadow 0.2s ease;
  background: white;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
.sr-input:focus,
input[type="text"]:focus,
button:focus,
.focused {
  box-shadow: 0 0 0 1px rgba(50, 151, 211, 0.3), 0 1px 1px 0 rgba(0, 0, 0, 0.07),
    0 0 0 4px rgba(50, 151, 211, 0.3);
  outline: none;
  z-index: 9;
}
.sr-input::placeholder,
input[type="text"]::placeholder {
  color: var(--gray-light);
}

/* Stripe Element placeholder */
.sr-card-element {
  padding-top: 12px;
}
</style>
