export function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100";
    case "delivered":
      return "bg-green-100";
    case "shipped":
      return "bg-blue-100";
    case "returned":
      return "bg-orange-100";
    case "cancelled":
      return "bg-red-100";
    case "failed":
      return "bg-gray-100";
    case "refunded":
      return "bg-purple-100";
    case "processing":
      return "bg-teal-100";
    default:
      return "bg-white";
  }
}
