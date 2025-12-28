import './style.css'

const PLAN_DATA = {
    free: { label: 'Free', price: '€0 / Monat' },
    pro: { label: 'Pro', price: '€0,99 / Monat' },
    premium: { label: 'Premium', price: '€2,99 / Monat' },
}

let selectedPlan = null

function setPlan(planKey) {
    selectedPlan = planKey
    const summary = document.getElementById('plan-summary')
    const data = PLAN_DATA[planKey]
    summary.textContent = `Ausgewählter Plan: ${data.label} (${data.price}).`
}

document.querySelectorAll('[data-plan]').forEach((el) => {
    el.addEventListener('click', () => setPlan(el.dataset.plan))
})

document.getElementById('year').textContent = String(new Date().getFullYear())

const form = document.getElementById('checkout-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (!selectedPlan) {
        document.getElementById('plan-summary').textContent = 'Bitte wähle zuerst einen Plan aus, bevor du fortfährst.'
        document.getElementById('plan-summary').focus?.()
        return
    }

    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    document.getElementById('success').hidden = false
    document.getElementById('success').scrollIntoView({ behavior: 'smooth' })
})