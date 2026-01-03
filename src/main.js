import '../public/style.css'

const PLAN_DATA = {
    free: {label: 'Free', price: '€0 / Month'},
    pro: {label: 'Pro', price: '€0,99 / Month'},
    premium: {label: 'Premium', price: '€2,99 / Month'},
}

let selectedPlan = null

const summary = document.getElementById('plan-summary')
const form = document.getElementById('checkout-form')
const success = document.getElementById('success')
const year = document.getElementById('year')

if (year) {
    year.textContent = String(new Date().getFullYear())
}

function setPlan(planKey) {

    if (!summary) return

    if (selectedPlan) {
        const selectedPlanBefore = document.getElementById(selectedPlan)
        selectedPlanBefore?.classList.remove('selected')
    }

    selectedPlan = planKey
    const data = PLAN_DATA[planKey]

    summary.textContent = `Plan chosen: ${data.label} (${data.price}).`

    const selectedPlanCard = document.getElementById(planKey)
    selectedPlanCard?.classList.add('selected')
}

document.querySelectorAll('[data-plan]').forEach((el) => {
    el.addEventListener('click', () => setPlan(el.dataset.plan))
})

if (form) {

    const successAudio = document.getElementById('success-jingle')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!selectedPlan) {
            if (summary) {
                summary.textContent = 'Please select a plan first before continuing.'
                summary.focus?.()
            }
            return
        }

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        if (success) {
            success.hidden = false
            success.scrollIntoView({behavior: 'smooth'})
        }

        if (successAudio) {
            successAudio.currentTime = 0
            successAudio.play().catch(() => {
            })
        }
        
    })
}