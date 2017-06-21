#lang sicp
(define (f n) (f-iter-recursive n))
(define (f-iter-recursive n)
  (if (< n 3)
      n
      (+ (f-iter-recursive (- n 1))
         (* 2 (f-iter-recursive (- n 2)))
         (* 3 (f-iter-recursive (- n 3))))))
(f 5)
(define (f-iter-iterative pev1 pev2 pev3 now target)
  (if (= target now)
      (+ pev1 (* 2 pev2) (* 3 pev3))
      (f-iter-iterative (+ pev1 (* 2 pev2) (* 3 pev3))
                        pev1
                        pev2 
                        (+ 1 now)
                        target)))
(define (f2 n)
  (if (< n 3)
      n
      (f-iter-iterative 2 1 0 3 n)))
(f2 5)