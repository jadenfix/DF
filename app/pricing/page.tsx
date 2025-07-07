'use client';

import { motion } from 'framer-motion';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/layout/navigation';

const plans = [
	{
		name: 'Starter',
		price: '$0',
		period: 'forever',
		description: 'Perfect for developers and small projects exploring Moondream',
		features: [
			'5,000 API calls per month',
			'Moondream 2 (1.6B) access',
			'Basic image analysis',
			'Community support',
			'Standard rate limits',
			'Public model only',
		],
		cta: 'Start Building Free',
		popular: false,
	},
	{
		name: 'Professional',
		price: '$49',
		period: 'per month',
		description: 'For production applications with commercial use',
		features: [
			'100,000 API calls per month',
			'All Moondream variants (4-bit, 8-bit)',
			'AI-powered insights & analytics',
			'Priority support',
			'Higher rate limits',
			'Custom fine-tuning',
			'Advanced RLHF pipeline',
			'Real-time monitoring',
		],
		cta: 'Start Pro Trial',
		popular: true,
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		period: 'contact sales',
		description: 'For large-scale deployments with enterprise requirements',
		features: [
			'Unlimited API calls',
			'Dedicated model instances',
			'On-premise deployment',
			'24/7 dedicated support',
			'Custom model fine-tuning',
			'SOC 2 compliance',
			'99.9% SLA guarantees',
			'Dedicated account manager',
			'White-label deployment',
			'Advanced security features',
		],
		cta: 'Contact Sales',
		popular: false,
	},
];

export default function Pricing() {
	return (
		<>
			<Navigation />

			<div className="min-h-screen bg-background">
				<div className="max-w-7xl mx-auto px-6 py-16">
					{/* Header */}
					<div className="text-center mb-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<h1 className="text-4xl font-bold mb-6 text-foreground">
								Simple, Transparent Pricing
							</h1>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Deploy Moondream&apos;s vision AI at scale. Start free, scale with
								confidence.
							</p>
						</motion.div>
					</div>

					{/* Usage Calculator */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="card p-6 max-w-2xl mx-auto mb-16"
					>
						<h2 className="text-2xl font-bold text-center mb-6 text-foreground">
							Calculate Your Usage
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-muted-foreground mb-2">
									Images per month
								</label>
								<input
									type="number"
									defaultValue="10000"
									className="input"
									placeholder="Enter number of images"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-muted-foreground mb-2">
									Estimated monthly cost
								</label>
								<div className="text-2xl font-bold text-primary">$49-149</div>
							</div>
						</div>
					</motion.div>

					{/* Plans */}
					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{plans.map((plan, index) => (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								className={`card p-8 relative ${
									plan.popular ? 'ring-2 ring-primary' : ''
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
											Most Popular
										</span>
									</div>
								)}

								<div className="text-center mb-8">
									<h3 className="text-2xl font-bold mb-2 text-foreground">
										{plan.name}
									</h3>
									<div className="mb-4">
										<span className="text-4xl font-bold text-foreground">
											{plan.price}
										</span>
										<span className="text-muted-foreground ml-2">
											{plan.period}
										</span>
									</div>
									<p className="text-muted-foreground">
										{plan.description}
									</p>
								</div>

								<ul className="space-y-4 mb-8">
									{plan.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-start">
											<CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
											<span className="text-muted-foreground">
												{feature}
											</span>
										</li>
									))}
								</ul>

								<button className="w-full btn btn-primary">
									{plan.cta}
								</button>
							</motion.div>
						))}
					</div>

					{/* FAQ Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="mt-24 max-w-4xl mx-auto"
					>
						<h2 className="text-3xl font-bold text-center mb-12 text-foreground">
							Frequently Asked Questions
						</h2>

						<div className="grid md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-2 text-foreground">
										Can I change plans anytime?
									</h3>
									<p className="text-muted-foreground">
										Yes! You can upgrade or downgrade your plan at any time.
										Changes take effect immediately.
									</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2 text-foreground">
										What happens if I exceed my monthly limit?
									</h3>
									<p className="text-muted-foreground">
										You&apos;ll receive a notification when you&apos;re close to
										your limit. You can upgrade your plan or wait until next
										month.
									</p>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-2 text-foreground">
										Is there a free trial for Pro plans?
									</h3>
									<p className="text-muted-foreground">
										Yes! All Pro plans come with a 14-day free trial. No credit
										card required to start.
									</p>
								</div>

								<div>
									<h3 className="text-lg font-semibold mb-2 text-foreground">
										What payment methods do you accept?
									</h3>
									<p className="text-muted-foreground">
										We accept all major credit cards, PayPal, and bank transfers
										for Enterprise plans.
									</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* CTA Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="mt-24 text-center"
					>
						<div className="card p-12 max-w-2xl mx-auto">
							<SparklesIcon className="h-12 w-12 mx-auto mb-6 text-primary" />
							<h2 className="text-3xl font-bold mb-4 text-foreground">
								Ready to Get Started?
							</h2>
							<p className="text-xl text-muted-foreground mb-8">
								Join thousands of users already experiencing the future of
								AI-powered image analysis.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button className="btn btn-primary">
									Start Free Trial
								</button>
								<button className="btn btn-secondary">
									Contact Sales
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}