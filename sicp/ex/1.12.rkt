#lang sicp
(define (passka-recursive col row)
  (if (or (= row 1) (= row col))
      1
      (+ (passka-recursive (- col 1) row)
         (passka-recursive (- col 1) (- row 1)))))

(passka-recursive 5 3)