import './style.css'

const PLAN_DATA = {
    free: { label: 'Free', price: '€0 / Month' },
    pro: { label: 'Pro', price: '€0,99 / Month' },
    premium: { label: 'Premium', price: '€2,99 / Month' },
}

let selectedPlan = null

const summary = document.getElementById('plan-summary')
const form = document.getElementById('checkout-form')
const success = document.getElementById('success')

function setPlan(planKey) {
    selectedPlan = planKey
    const data = PLAN_DATA[planKey]
    summary.textContent = `Plan chosen: ${data.label} (${data.price}).`
    summary.focus()
}

document.querySelectorAll('[data-plan]').forEach((el) => {
    el.addEventListener('click', () => setPlan(el.dataset.plan))
})

document.getElementById('year').textContent = String(new Date().getFullYear())

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!selectedPlan) {
        document.getElementById('plan-summary').textContent = 'Please select a plan first before continuing.'
        document.getElementById('plan-summary').focus()
        return
    }

    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    success.hidden = false
    success.scrollIntoView({ behavior: 'smooth' })
})