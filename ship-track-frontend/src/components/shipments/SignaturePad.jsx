import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SignaturePad = forwardRef(({ onSignatureChange }, ref) => {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#111827";
  }, []);

  useImperativeHandle(ref, () => ({
    getSignatureData: () => {
      if (!hasSignature || !canvasRef.current) {
        return null;
      }

      return canvasRef.current.toDataURL("image/png");
    },
    clear: () => clearSignature(),
    isEmpty: () => !hasSignature,
  }));

  const getPosition = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const position = getPosition(event);

    drawingRef.current = true;

    context.beginPath();
    context.moveTo(position.x, position.y);

    canvas.setPointerCapture(event.pointerId);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const position = getPosition(event);

    context.lineTo(position.x, position.y);
    context.stroke();

    if (!hasSignature) {
      setHasSignature(true);
      onSignatureChange?.(true);
    }
  };

  const stopDrawing = () => {
    drawingRef.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    setHasSignature(false);
    onSignatureChange?.(false);
  };

  return (
    <div className="mt-5">
      <p className="text-xs text-slate-500">Signature</p>

      <div className="mt-2 border border-slate-200 rounded-lg bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={600}
          height={200}
          className="w-full h-40 touch-none cursor-crosshair"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p
          className={`text-sm font-medium ${
            hasSignature ? "text-emerald-600" : "text-slate-500"
          }`}
        >
          {hasSignature
            ? "Signature captured — ready to save"
            : "Please sign inside the box."}
        </p>

        <button
          type="button"
          onClick={clearSignature}
          disabled={!hasSignature}
          className="text-sm text-slate-600 hover:text-slate-900 disabled:text-slate-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
