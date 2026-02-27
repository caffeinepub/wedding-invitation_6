import { useState } from "react";
import { X, Trash2, Users, CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useGetAllRSVPs, useGetRSVPCount, useDeleteRSVP } from "@/hooks/useQueries";

const ADMIN_PASSCODE = "wedding2026";

interface AdminPanelProps {
  onClose: () => void;
}

function formatDate(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setPasscode("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0.12 0.018 45 / 0.95)" }}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-auto"
        style={{
          background: "oklch(0.998 0.003 60)",
          boxShadow: "0 25px 80px oklch(0.1 0.02 45 / 0.5)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-gold/20"
          style={{ background: "oklch(0.998 0.003 60)" }}
        >
          <div>
            <h2 className="font-display text-2xl text-charcoal">Admin Panel</h2>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal/40 mt-0.5">
              Emily &amp; James · Wedding RSVP Management
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
            aria-label="Close admin panel"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-8">
          {!authenticated ? (
            <PasscodeGate
              passcode={passcode}
              setPasscode={setPasscode}
              error={passcodeError}
              onSubmit={handlePasscodeSubmit}
            />
          ) : (
            <RSVPDashboard />
          )}
        </div>
      </div>
    </div>
  );
}

interface PasscodeGateProps {
  passcode: string;
  setPasscode: (v: string) => void;
  error: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function PasscodeGate({ passcode, setPasscode, error, onSubmit }: PasscodeGateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 max-w-sm mx-auto">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, oklch(0.78 0.07 65 / 0.15), oklch(0.62 0.09 50 / 0.1))",
          border: "1px solid oklch(0.72 0.1 65 / 0.4)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <h3 className="font-display text-2xl text-charcoal mb-2">Admin Access</h3>
      <p className="font-body text-sm text-charcoal/50 mb-8 text-center">
        Enter the passcode to view RSVP submissions.
      </p>

      <form onSubmit={onSubmit} className="w-full space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className={`font-elegant text-base border-gold/20 focus:border-gold/50 bg-ivory rounded-none text-center tracking-widest ${
              error ? "border-destructive" : ""
            }`}
            autoComplete="current-password"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle size={14} />
              <p className="font-body text-xs">Incorrect passcode. Please try again.</p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-none font-body text-xs tracking-[0.2em] uppercase py-5"
          style={{
            background: "linear-gradient(135deg, oklch(0.45 0.08 35), oklch(0.38 0.07 40))",
          }}
        >
          Enter
        </Button>
      </form>
    </div>
  );
}

function RSVPDashboard() {
  const { data: rsvps, isLoading, error } = useGetAllRSVPs();
  const { data: counts } = useGetRSVPCount();
  const deleteRSVP = useDeleteRSVP();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-charcoal/40">
        <Loader2 size={20} className="animate-spin" />
        <span className="font-body text-sm">Loading RSVPs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-charcoal/50">
        <p className="font-body text-sm">Failed to load RSVPs. Please try again.</p>
      </div>
    );
  }

  const totalRSVPs = Number(counts?.total ?? 0);
  const attendingCount = Number(counts?.attending ?? 0);
  const notAttendingCount = Number(counts?.notAttending ?? 0);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total RSVPs", value: totalRSVPs, icon: <Users size={18} />, color: "oklch(0.72 0.1 65)" },
          { label: "Attending", value: attendingCount, icon: <CheckCircle size={18} />, color: "oklch(0.62 0.15 145)" },
          { label: "Not Attending", value: notAttendingCount, icon: <XCircle size={18} />, color: "oklch(0.55 0.15 30)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 text-center"
            style={{
              background: "oklch(0.97 0.015 55)",
              border: "1px solid oklch(0.88 0.02 50)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <p className="font-display text-3xl text-charcoal">{stat.value}</p>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal/40 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      {!rsvps || rsvps.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-elegant italic text-charcoal/40 text-lg">No RSVPs yet. Check back soon!</p>
        </div>
      ) : (
        <div
          className="overflow-x-auto"
          style={{ border: "1px solid oklch(0.88 0.02 50)" }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ background: "oklch(0.97 0.015 55)" }}>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Name</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Email</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Attending</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Meal</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Message</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50">Submitted</TableHead>
                <TableHead className="font-body text-xs tracking-widest uppercase text-charcoal/50 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rsvps.map((rsvp) => (
                <TableRow key={String(rsvp.id)} className="hover:bg-ivory/50">
                  <TableCell className="font-elegant text-base text-charcoal whitespace-nowrap">
                    {rsvp.name}
                  </TableCell>
                  <TableCell className="font-body text-sm text-charcoal/60 whitespace-nowrap">
                    {rsvp.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="rounded-none font-body text-xs tracking-wider uppercase"
                      style={{
                        background: rsvp.attending
                          ? "oklch(0.62 0.15 145 / 0.15)"
                          : "oklch(0.55 0.15 30 / 0.15)",
                        color: rsvp.attending
                          ? "oklch(0.42 0.12 145)"
                          : "oklch(0.45 0.12 30)",
                        border: `1px solid ${rsvp.attending ? "oklch(0.62 0.15 145 / 0.3)" : "oklch(0.55 0.15 30 / 0.3)"}`,
                      }}
                    >
                      {rsvp.attending ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-body text-sm text-charcoal/60">
                    {rsvp.mealPreference || "—"}
                  </TableCell>
                  <TableCell
                    className="font-elegant text-sm text-charcoal/60 max-w-[200px] truncate"
                    title={rsvp.message}
                  >
                    {rsvp.message || "—"}
                  </TableCell>
                  <TableCell className="font-body text-xs text-charcoal/40 whitespace-nowrap">
                    {formatDate(rsvp.submittedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          type="button"
                          className="p-1.5 text-charcoal/30 hover:text-destructive transition-colors"
                          aria-label={`Delete RSVP for ${rsvp.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-none font-body">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-display text-xl text-charcoal">
                            Delete RSVP?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="font-elegant text-base text-charcoal/60">
                            This will permanently remove the RSVP from{" "}
                            <strong>{rsvp.name}</strong>. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-none font-body text-xs tracking-wider uppercase">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-none font-body text-xs tracking-wider uppercase bg-destructive hover:bg-destructive/90"
                            onClick={() => deleteRSVP.mutate(rsvp.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
