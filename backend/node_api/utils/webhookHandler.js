export function handleWebhook(req, res) {
  const event = req.body;
  console.log("📩 Webhook Event Received:", event);

  switch (event.type) {
    case "wallet.topup":
      console.log(`Wallet top-up: ₹${event.data.amount}`);
      break;
    case "transaction.new":
      console.log("New transaction synced:", event.data);
      break;
    default:
      console.log("Unhandled webhook type:", event.type);
  }

  res.status(200).json({ received: true });
}
